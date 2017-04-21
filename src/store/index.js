import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase";
import componentStates from "./modules/component-states";
import superagent from "superagent";
import model from "./model-sample";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
        model,
        documentTitle: ""
    },
    getters: {
        signedIn: state => state.userInfo
    },
    mutations: {
        updateUserInfo(state, value) {
            state.userInfo = value;
        },
        setModel(state, model) {
            state.model = model;
        },
        setDocumentTitle(state, title) {
            state.documentTitle = title;
        }
    },
    actions: {
        openDrawerMenu({commit}) {
            commit("setDrawerMenuOpen", true);
        },
        closeDrawerMenu({commit}) {
            commit("setDrawerMenuOpen", false);
        },
        signInAnonymously({commit}) {
            commit("updateWaitingState", true);
            firebase.auth().signInAnonymously().then(() => {
                commit("updateWaitingState", false);
            }, () => {
                commit("updateWaitingState", false);
            });
        },
        signIn({commit}, {email, password}) {
            commit("updateWaitingState", true);
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                commit("updateWaitingState", false);
            }, () => {
                commit("updateWaitingState", false);
            });
        },
        signOut({commit}) {
            commit("updateWaitingState", true);
            firebase.auth().signOut().then(() => {
                commit("updateWaitingState", false);
            });
        },
        calculate({commit, state}) {
            var model = state.model;
            superagent.post("https://nameless-falls-59671.herokuapp.com")
                .send(JSON.stringify({
                    jsonrpc: "2.0",
                    id: require("uuid/v4")(),
                    method: "calculate",
                    params: [model]
                }))
                .end(function(err, res) {
                    if (err) {
                        var msg = "";
                        Object.keys(err.response).forEach(function(key) {
                            msg += key + ": " + err.response[key];
                        });
                        alert(msg);
                    } else {
                        alert(res.text);
                    }
                });
        }
    },
    plugins: [
        store => {
            firebase.auth().onAuthStateChanged(user => {
                store.commit("updateUserInfo", user);
            });
        }
    ],
    modules: {
        componentStates
    }
});
