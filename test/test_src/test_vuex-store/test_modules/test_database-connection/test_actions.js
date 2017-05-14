import {
    firebaseInitialize
} from "../../../../../src/vuex-store/modules/database-connection/actions";
import assert from "assert";
import server from "karma-firebase-server/control";
import firebase from "firebase";

describe("databaseConnectionモジュールのactions - ", function() {
    let fbPort, observer;
    before("firebase-serverを起動", function (done) {
        server.start(port => {
            fbPort = port;
            done();
        });
    });
    after("firebase-serverを終了", function(done) {
        server.close(fbPort, () => {
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
                firebase.app(appname).delete().then(done);
            });
        });
    });
});
