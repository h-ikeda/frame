import {mutations} from ".";
import assert from "assert";

describe("datatableモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setNameのテスト", function() {
            it("文字列を渡すと、ステートにコピーされる", function() {
                const state = {
                    name: "before"
                };
                const test = "after";
                mutations.setName(state, test);
                assert.equal(state.name, test);
            });
        });
    });
});
