import datatable from ".";
import assert from "assert";

const {mutations} = datatable;

describe("datatableモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setNameのテスト", function() {
            it("文字列を渡すと、ステートにコピーされる", function() {
                const state = {
                    selected: "before"
                };
                const test = "after";
                mutations.select(state, test);
                assert.equal(state.selected, test);
            });
        });
    });
});
