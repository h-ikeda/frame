import firebase from "firebase";

export function firebaseInitialize({commit}, options) {
    const app = firebase.initializeApp(options);
    commit("setFirebaseAppname", app.name);
};

export function signInAnonymously({commit}) {
    firebase.auth().signInAnonymously().then(() => {});
};

export function signIn({commit}, {email, password}) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {});
};

export function signOut({commit}) {
    firebase.auth().signOut().then(() => {});
};
