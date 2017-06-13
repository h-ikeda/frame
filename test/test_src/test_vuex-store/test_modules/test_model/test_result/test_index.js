import {valid} from "./mock-result-factories";
const {mutations} = global.requireSrc(__filename).default;
import assert from "assert";

describe("resultモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setDataのテスト", function() {
            it("オブジェクトを渡すと、有効なプロパティがステートにコピーされる。", function() {
                const state = valid();
                const test = valid();
                mutations.setData(state, test);
                assert.deepStrictEqual(state, test);
            });
            it("余計なプロパティはコピーされない。", function() {
                const state = valid();
                const expected = valid();
                const test = Object.assign({}, expected);
                test.waste = {should: "not be copied"};
                mutations.setData(state, test);
                assert(!("waste" in state));
                assert.deepEqual(state, expected);
            });
        });
    });
});
