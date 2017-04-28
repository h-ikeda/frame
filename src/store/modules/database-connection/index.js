import firebase from "firebase";
import * as state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

import model from "./model-sample";
state.model = model;

export default {
    state,
    getters,
    mutations,
    actions,
    plugins: [
        store => {
            firebase.auth().onAuthStateChanged(user => {
                store.commit("updateUserInfo", user);
            });
        }
    ]
}