import model from ".";
import assert from "assert";
import uuid from "uuid/v4";
import {valid as validInput} from "./input/mock-input-factories";

const {mutations, actions} = model;

describe("modelモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setTitleのテスト", function() {
            it("文字列を渡すと、ステートにコピーされる", function() {
                const state = {
                    title: "before"
                };
                const test = "after";
                mutations.setTitle(state, test);
                assert.equal(state.title, test);
            });
        });
        describe("updateRequestIdのテスト", function() {
            it("実行前後のrequestIdは異なる", function() {
                const before = uuid();
                const state = {
                    requestId: before
                };
                mutations.updateRequestId(state);
                assert.notEqual(state.requestId, before);
            });
        });
        describe("setCalculatedのテスト", function() {
            it("真偽値を渡すと、ステートにコピーされる", function() {
                const state = {
                    calculated: false
                };
                mutations.setCalculated(state, true);
                assert(state.calculated);
                mutations.setCalculated(state, false);
                assert(!state.calculated);
            });
        });
    });
    describe("actionsのテスト", function() {
        describe("calculateのテスト", function() {
            beforeEach(function() {
                this.committed = {
                    mutations: [],
                    payloads: []
                };
                this.context = {
                    getters: {
                        "input/data": () => validInput()
                    },
                    commit: (mutation, payload) => {
                        this.committed.mutations.push(mutation);
                        this.committed.payloads.push(payload);
                    },
                    state: {
                        requestId: uuid(),
                        input: validInput()
                    }
                };
            });
            it("calculatedがfalseに設定される", function() {
                actions.calculate(this.context);
                assert.equal(this.committed.mutations.indexOf("setCalculated"), 0);
                assert.strictEqual(this.committed.payloads[0], false);
            });
            it("requestIdが更新される", function() {
                actions.calculate(this.context);
                assert.strictEqual(this.committed.mutations.indexOf("updateRequestId"), 1);
            });
        });
    });
});
