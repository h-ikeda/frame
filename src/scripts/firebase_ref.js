/*eslint-env node */

var firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyD_xT2uE82MaQL08P_BshM-q7bbPMejlWE",
    authDomain: "frame-155310.firebaseapp.com",
    databaseURL: "https://frame-155310.firebaseio.com"
});

module.exports = firebase.database().ref("demo/frameModel");
