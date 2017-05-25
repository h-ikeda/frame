const vuexStore = global.requireSrc(__filename).default;
import {Store} from "vuex";
import xhr from "xhr";
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
            let fakeXhr, requests;
            beforeEach(function() {
                fakeXhr = sinon.useFakeXMLHttpRequest();
                requests = [];
                fakeXhr.onCreate = (req) => {
                    requests.push(req);
                };
                xhr.XMLHttpRequest = global.XMLHttpRequest;
            });
            afterEach(function() {
                fakeXhr.restore();
                xhr.XMLHttpRequest = global.XMLHttpRequest;
            });
            it("setXhrIdが1回だけ呼び出される", function() {
                actions.calculate({commit, state});
                assert(commit.withArgs("setXhrId", sinon.match.string).calledOnce);
            });
            it("modeldataInputの内容がPOSTされる", function() {
                const input = {model: {data: "Mocked input"}};
                state.xhrId = "test-id";
                state.modeldataInput = input;
                actions.calculate({commit, state});
                assert.equal(requests.length, 1);
                assert.equal(requests[0].method, "POST");
                assert.equal(requests[0].url, "https://nameless-falls-59671.herokuapp.com");
                let body = JSON.parse(requests[0].requestBody);
                assert.deepStrictEqual(body, {
                    jsonrpc: "2.0",
                    id: state.xhrId,
                    method: "frame.calculate",
                    params: [input]
                });
            });
        });
    });
});
