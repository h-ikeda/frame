import {
    firebaseInitialize
} from "../actions";
import assert from "assert";
import superagent from "superagent";
import firebase from "firebase";

describe("databaseConnectionモジュールのactions - ", function() {
    let fbPort, observer;
    before("firebase-serverを起動", function (done) {
        this.timeout(10000);
        superagent.get("http://localhost:9876/firebase-server/start").then(res => {
            fbPort = res.text;
            done();
        });
    });
    after("firebase-serverを終了", function(done) {
        this.timeout(10000);
        superagent.get("http://localhost:9876/firebase-server/close/" + fbPort).then(() => {
            done();
        });
    });
    describe("firebaseInitialize - ", function() {
        it("初期化", function(done) {
            const initializeOption = {
                apiKey: "AIzaSyD_xT2uE82MaQL08P_BshM-q7bbPMejlWE",
                databaseURL: "ws://127.0.1:" + fbPort,
            };
            let appname = false;
            function commit(type, payload) {
                if (type === "setFirebaseAppname") {
                    assert.equal(typeof payload, "string");
                    appname = payload;
                }
            }
            firebaseInitialize({commit}, initializeOption);
            assert(appname);
            firebase.app(appname).auth().signInAnonymously().then(user => {
                assert(user);
                done();
            });
        });
    });
});
