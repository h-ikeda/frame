/*eslint-env node */

var firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyD_xT2uE82MaQL08P_BshM-q7bbPMejlWE",
    authDomain: "frame-155310.firebaseapp.com",
    databaseURL: "https://frame-155310.firebaseio.com"
});

module.exports.ref = firebase.database().ref("demo/frameModel");

module.exports.signIn = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
};