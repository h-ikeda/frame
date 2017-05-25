const vuexStore = global.requireSrc(__filename).default;
import {Store} from "vuex";
import sinon from "sinon";
import assert from "assert";

describe("Vuexストアオプションのテスト", function() {
    it("Vuex.Storeとしてインスタンス化できる", function() {
        const store = new Store(vuexStore);
        assert(store instanceof Store);
    });
    describe("actionsのテスト", function() {
        const {actions} = vuexStore;
        let commit, state;
        beforeEach(function() {
            commit = sinon.stub();
            state = {};
        });
        describe("calculateのテスト", function() {
            let xhr;
            beforeEach(function() {
                xhr = sinon.useFakeXMLHttpRequest();
            });
            afterEach(function() {
                xhr.restore();
            });
            describe("modeldataInputをJSONRPC形式でPOSTし、応答結果をmodeldataResultに格納する", function() {
                it("setXhrIdが1回だけ呼び出される", function() {
                    actions.calculate({commit, state});
                    assert(commit.withArgs("setXhrId", sinon.match.string).calledOnce);
                });
                it("modeldataInputの内容がPOSTされる", function() {
                    const input = {model: {data: "Mocked input"}};
                    state.modeldataInput = input;
                    let method, postedData;
                    const stubXhr = sinon.stub();
                    xhr.onCreate = (req) => {
                        method = req.method;
                        postedData = JSON.parse(req.body);
                        stubXhr();
                    };
                    actions.calculate({commit, state});
                    assert(stubXhr.calledOnce);
                    assert.equal(method, "POST");
                    assert.deepStrictEqual(postedData, input);
                });
                it("サーバーから返された内容がmodeldataResultに格納される", function() {
                    
                });
            });
        });
    });
});
