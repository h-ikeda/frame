/*eslint-env node */

var firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyD_xT2uE82MaQL08P_BshM-q7bbPMejlWE",
    authDomain: "frame-155310.firebaseapp.com",
    databaseURL: "https://frame-155310.firebaseio.com"
});

function setRef(ref) {
    module.exports.ref = firebase.database().ref(ref);
}
setRef("demo/frameModel");

module.exports.signIn = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
};

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        setRef("userdata/" + user.uid + "/frameModel");
    } else {
        setRef("demo/frameModel");
    }
    module.exports.onRefChanged();
});