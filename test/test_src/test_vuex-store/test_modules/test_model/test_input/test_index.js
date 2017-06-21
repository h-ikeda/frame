import {valid} from "./mock-input-factories";
const {state: createState, getters, mutations} = global.requireSrc(__filename).default;
import uuid from "uuid/v4";
import assert from "assert";

describe("Inputモジュールのテスト", function() {
    describe("gettersのテスト", function() {
        describe("indexOfのテスト", function() {
            it("指定したuuidのインデックス番号を返す。", function() {
                const testId = uuid();
                const state = createState();
                state.idMap = {
                    nodes: [uuid(), uuid(), testId, uuid()]
                };
                assert.equal(typeof getters.indexOf(state), "function");
                const result = getters.indexOf(state)("nodes", testId);
                assert.equal(result, 2);
            });
        });
    });
    describe("mutationsのテスト", function() {
        describe("setDataのテスト", function() {
            it("オブジェクトを渡すと、有効なプロパティがステートにコピーされる。", function() {
                const state = createState();
                const test = valid();
                mutations.setData(state, test);
                Object.keys(test).forEach((key) => {
                    assert.equal(state[key], test[key]);
                });
            });
            it("余計なプロパティはコピーされない。", function() {
                const state = createState();
                const expected = valid();
                const test = Object.assign({}, expected);
                test.waste = {should: "not be copied"};
                mutations.setData(state, test);
                assert(!("waste" in state));
                Object.keys(expected).forEach((key) => {
                    assert.equal(state[key], expected[key]);
                });
            });
        });
    });
});
