const {mutations} = global.requireSrc(__filename).default;
import assert from "assert";

describe("canvasモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setBackgroundColorのテスト", function() {
            it("文字列を渡すと、ステートにコピーされる", function() {
                const state = {
                    backgroundColor: "before"
                };
                const test = "after";
                mutations.setBackgroundColor(state, test);
                assert.equal(state.backgroundColor, test);
            });
        });
    });
});
