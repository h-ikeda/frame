import firebase from "./firebase";
const auth = firebase.auth();

export function signInAnonymously({commit}) {
    commit("updateWaitingState", true);
    auth.signInAnonymously().then(() => {
        commit("updateWaitingState", false);
    }, () => {
        commit("updateWaitingState", false);
    });
};

export function signIn({commit}, {email, password}) {
    commit("updateWaitingState", true);
    auth.signInWithEmailAndPassword(email, password).then(() => {
        commit("updateWaitingState", false);
    }, () => {
        commit("updateWaitingState", false);
    });
};

export function signOut({commit}) {
    commit("updateWaitingState", true);
    auth.signOut().then(() => {
        commit("updateWaitingState", false);
    });
};
