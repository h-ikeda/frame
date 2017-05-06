import firebase from "firebase";

export function firebaseInitialize({commit}, options) {
    const app = firebase.initializeApp(options);
    commit("setFirebaseAppname", app.name);
    app.auth().onAuthStateChanged(user => {
        commit("setFirebaseUser", user);
    });
};

export function signInAnonymously({commit, state}) {
    firebase.app(state.appname).auth().signInAnonymously().then(() => {});
};

export function signIn({commit, state}, {email, password}) {
    firebase.app(state.appname).auth().signInWithEmailAndPassword(email, password).then(() => {});
};

export function signOut({commit, state}) {
    firebase.app(state.appname).auth().signOut().then(() => {});
};
