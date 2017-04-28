import firebase from "./firebase";
const auth = firebase.auth();

export function signInAnonymously({commit}) {
    auth.signInAnonymously().then(() => {});
};

export function signIn({commit}, {email, password}) {
    auth.signInWithEmailAndPassword(email, password).then(() => {});
};

export function signOut({commit}) {
    auth.signOut().then(() => {});
};
