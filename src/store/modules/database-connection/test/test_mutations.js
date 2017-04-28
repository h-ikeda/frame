import {
    setFirebaseUser
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
});
