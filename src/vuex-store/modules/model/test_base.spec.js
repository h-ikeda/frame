import assert from "assert";
import Base from "./base";

describe("modelモジュールのBaseクラスのテスト", function() {
    it("インスタンス化可能", function() {
        const base = new Base();
        assert(base instanceof Base);
    });
    describe("gettersのテスト", function() {
        describe("dataのテスト", function() {
            it("子モジュールを持たないとき、state.dataのコピーが返される。", function() {
                const state = {
                    data: {
                        a: "some data",
                        b: "any data"
                    }
                };
                const base = new Base();
                const result = base.getters.data(state);
                assert.equal(result, state.data);
            });
        });
    });
});
