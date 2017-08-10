import assert from "assert";
import Base from "./base";

describe("modelモジュールのBaseクラスのテスト", function() {
    it("インスタンス化可能", function() {
        const base = new Base();
        assert(base instanceof Base);
    });
    describe("stateのテスト", function() {
        it("オプションに渡したstateが含まれる", function() {
            const state = {
                a: "data",
                b: ["_data"],
                c: {i: "__data"}
            };
            const base = new Base({state});
            const result = base.state;
            assert.equal(result.a, state.a);
            assert.equal(result.b, state.b);
            assert.equal(result.c, state.c);
        });
        it("オプションのstateが関数のとき、関数の結果を含む", function() {
            const base = new Base({
                state() {
                    return {
                        a: "data",
                        b: "_data",
                        c: "__data"
                    };
                }
            });
            const result = base.state;
            assert.equal(result.a, "data");
            assert.equal(result.b, "_data");
            assert.equal(result.c, "__data");
        });
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
