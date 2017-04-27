import firebase from "firebase";
import model from "./model-sample";
//import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

export default {
    state: {
        model,
        userInfo: null
    },
//    getters,
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