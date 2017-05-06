import {
    setFirebaseUser,
    setFirebaseAppname
} from "../mutations";
import * as initialState from "../state";
import assert from "assert";

describe("databaseConnectionモジュールのmutations - ", function() {
    let state;
    beforeEach(function() {
        state = {};
        Object.keys(initialState).forEach(key => {
            state[key] = initialState[key];
        });
    });
    describe("setFirebaseUser - ", function() {
        it("新しいオブジェクトを設定", function() {
            const newUser = {info: "value"};
            setFirebaseUser(state, newUser);
            assert(state.user === newUser);
        });
        it("nullを設定", function() {
            const newUser = null;
            setFirebaseUser(state, newUser);
            assert(state.user === newUser);
        });
        describe("オブジェクトでないものを設定 - ", function() {
            const validUser = {info: "value"};
            beforeEach(function() {
                state.user = validUser;
            });
            it("文字列", function() {
                const invalidUser = "string";
                assert.throws(() => {
                    setFirebaseUser(state, invalidUser);
                }, /TypeError: setFirebaseUser accepts only object\. string is set\./);
                assert(state.user === validUser);
            });
            it("関数", function() {
                const invalidUser = () => 99;
                assert.throws(() => {
                    setFirebaseUser(state, invalidUser);
                }, /TypeError: setFirebaseUser accepts only object\. function is set\./);
                assert(state.user === validUser);
            });
            it("undefined", function() {
                const invalidUser = void 0;
                assert.throws(() => {
                    setFirebaseUser(state, invalidUser);
                }, /TypeError: setFirebaseUser accepts only object\. undefined is set\./);
                assert(state.user === validUser);
            });
            it("数値", function() {
                const invalidUser = 90;
                assert.throws(() => {
                    setFirebaseUser(state, invalidUser);
                }, /TypeError: setFirebaseUser accepts only object\. number is set\./);
                assert(state.user === validUser);
            });
        });
    });
    describe("setFirebaseAppname - ", function() {
        it("新しいAppnameを設定", function() {
            setFirebaseAppname(state, "new name");
            assert(state.appname === "new name");
        });
        it("falseを設定", function() {
            setFirebaseAppname(state, false);
            assert(state.appname === false);
        });
        describe("文字列でないものを設定 - ", function() {
            beforeEach(function() {
                state.appname = "test default";
            });
            it("true", function() {
                assert.throws(() => {
                    setFirebaseAppname(state, true);
                }, /TypeError: setFirebaseAppname accepts only string or false\. true is set\./);
                assert(state.appname === "test default");
            });
            it("関数", function() {
                assert.throws(() => {
                    setFirebaseAppname(state, () => 99);
                }, /TypeError: setFirebaseAppname accepts only string or false\. function is set\./);
                assert(state.appname === "test default");
            });
            it("undefined", function() {
                assert.throws(() => {
                    setFirebaseAppname(state, void 0);
                }, /TypeError: setFirebaseAppname accepts only string or false\. undefined is set\./);
                assert(state.appname === "test default");
            });
            it("null", function() {
                assert.throws(() => {
                    setFirebaseAppname(state, null);
                }, /TypeError: setFirebaseAppname accepts only string or false\. object is set\./);
                assert(state.appname === "test default");
            });
            it("オブジェクト", function() {
                assert.throws(() => {
                    setFirebaseAppname(state, {appname: "new name"});
                }, /TypeError: setFirebaseAppname accepts only string or false\. object is set\./);
                assert(state.appname === "test default");
            });
            it("数値", function() {
                assert.throws(() => {
                    setFirebaseAppname(state, 90);
                }, /TypeError: setFirebaseAppname accepts only string or false\. number is set\./);
                assert(state.appname === "test default");
            });
        });
    });
});
