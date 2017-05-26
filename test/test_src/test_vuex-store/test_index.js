const vuexStore = global.requireSrc(__filename).default;
import {Store} from "vuex";
import assert from "assert";
// xhrのXMLHttpRequestをモックするため、xhrモジュールのオブジェクトを取得。
import xhr from "xhr";

//
// モックデータ作成用の乱数生成関数です。
//
// 指定範囲の乱数を生成します。
// isIntがtruthyのとき、整数が返ります。
// orBoolがtruthyのとき、乱数または真偽値が返ります。
// boolProbabilityにより、真偽値が返る頻度を調整できます。
// 1.0に近いほど真偽値が多くなり、0.0に近いほど乱数が多くなります。
//
function ran(max = 10000000, min = -10000000, isInt, orBool, boolProbability = 0.2) {
    if (orBool && Math.random() < boolProbability) {
        return Math.random() < 0.5 ? true: false;
    }
    if (isInt) {
        max = Math.floor(max) + 1;
        min = Math.ceil(min);
    }
    let range = (max - min) * Math.random();
    return (isInt ? Math.floor(range): range) + min;
}

//
// 指定範囲の長さでランダムな文字列を生成。
//
function ranStr(max = 64, min = 1) {
    const len = ran(max, min, true);
    let t = "";
    for (let i = 0; i < len; ++i) {
        t += String.fromCharCode(ran(126, 32, true));
    }
    return t;
}

//
// 3次元または6次元のデータオブジェクトを生成します。
//
function createData(dimension, orBool) {
    const t = {};
    ["x", "y", "z", "rx", "ry", "rz"].slice(dimension - 6).forEach((key) => {
        t[key] = ran(10000000, -10000000, false, orBool);
    });
    return t;
}

//
// 指定したプロパティを持つオブジェクトを生成します。
//
function createObjectWithProperties(properties, factory) {
    const t = {};
    properties.forEach((key) => {
        t[key] = factory();
    });
    return t;
}

//
// ランダムなプロパティ名にfactory関数の生成物を割り当てます。
//
function createObjectWithRandomKeys(max, min, factory) {
    const len = ran(max, min, true);
    const t = {};
    for (let i = 0; i < len; ++i) {
        t[ranStr()] = factory();
    }
    return t;
}

//
// オブジェクトのOwnPropertyをランダムに取り出して返します。
//
function selectRandomKey(obj) {
    const t = Object.keys(obj);
    return t[ran(t.length - 1, 0, true)];
}

//
// ランダムなインプットデータを作成。
//
function createMockInput() {
    // shapeプロパティとその他のランダムな名前のプロパティを持つ断面データを生成。
    function createSection() {
        return Object.assign(createObjectWithRandomKeys(20, 1, ran), {shape: ranStr()});
    }
    // E, Gプロパティを持つ材料データを生成。
    function createMaterial() {
        return {E: ran(), G: ran()};
    }
    // 各要素の集合を作ります。
    const nodes = createObjectWithRandomKeys(50, 10, () => createData(3));
    const sections = createObjectWithRandomKeys(20, 1, createSection);
    const materials = createObjectWithRandomKeys(10, 1, createMaterial);
    const boundaries = createObjectWithRandomKeys(20, 10, () =>
        Object.assign(createData(6, true), {node: selectRandomKey(nodes)})
    );
    const nodeLoads = createObjectWithRandomKeys(20, 5, () =>
        Object.assign(createData(6), {node: selectRandomKey(nodes)})
    );
    // 梁要素は複数の外部要素IDを持つので、組合せを計算して生成します。
    const lines = {};
    const handled = [];
    Object.keys(nodes).forEach((n1) => {
        handled.push(n1);
        Object.keys(nodes).forEach((n2) => {
            if (handled.indexOf(n2) < 0 && Math.random() > 0.2) {
                lines[ranStr()] = {
                    n1,
                    n2,
                    section: selectRandomKey(sections),
                    material: selectRandomKey(materials)
                };
            }
        });
    });
    // 全ての生成された要素集合を持つオブジェクトをインプットデータのモックとして返します。
    return {
        nodes,
        sections,
        materials,
        boundaries,
        nodeLoads,
        lines
    };
}

//
// インプットデータに対応する結果データを作成。
//
function createMockResult(input) {
    return {
        displacements: createObjectWithProperties(Object.keys(input.nodes), () => createData(6)),
        reactions: createObjectWithProperties(Object.keys(input.boundaries).map((boundary) =>
            boundary.node
        ).filter((boundary, index, self) =>
            self.indexOf(boundary) === index
        ), () => createData(6)),
        stresses: createObjectWithProperties(Object.keys(input.lines), () => createData(6))
    };
}

//
// JSONRPC2.0の応答を作成。
//
function createJsonRpcResponse(request) {
    const parsed = JSON.parse(request.requestBody);
    console.log(parsed)
    const input = Array.isArray(parsed.params) ? parsed.params[0]: parsed.params.model;
    return JSON.stringify({
        jsonrpc: "2.0",
        id: parsed.id,
        result: createMockResult(input)
    });
}

describe("Vuexストアオプションのテスト", function() {
    it("Vuex.Storeとしてインスタンス化できる", function() {
        const store = new Store(vuexStore);
        assert(store instanceof Store);
    });
    describe("actionsのテスト", function() {
        const {actions} = vuexStore;
        let commit, state, context;
        beforeEach(function() {
            // Vuex関数のモック
            commit = sinon.stub();
            state = {};
            context = {
                commit,
                state
            };
            // Vuexミューテーションのモック
            // commitで指定した名前のミューテーションの動作を定義。
            commit.withArgs("setXhrId").callsFake((type, payload) => {
                state.xhrId = payload;
            });
            commit.withArgs("setModeldataResult").callsFake((type, payload) => {
                state.modeldataResult = payload;
            });
        });
        describe("calculateのテスト", function() {
            let fakeXhr, requests;
            beforeEach(function() {
                fakeXhr = sinon.useFakeXMLHttpRequest();
                requests = [];
                // XHRリクエストの度にリクエストオブジェクトが追加される。
                fakeXhr.onCreate = (req) => {
                    requests.push(req);
                };
                // xhrモジュールのXMLHttpRequestを置換。
                xhr.XMLHttpRequest = global.XMLHttpRequest;
            });
            afterEach(function() {
                fakeXhr.restore();
                // xhrモジュールのXMLHttpRequestを復元。
                xhr.XMLHttpRequest = global.XMLHttpRequest;
            });
            it("setXhrIdが1回だけ呼び出される", function() {
                actions.calculate(context);
                assert(commit.withArgs("setXhrId", sinon.match.string).calledOnce);
            });
            it("XHRリクエストが1回だけ呼び出される", function() {
                actions.calculate(context);
                assert.equal(requests.length, 1);
            })
            it("XHRリクエストメソッドはPOST", function() {
                actions.calculate(context);
                assert.equal(requests[0].method, "POST");
            });
            it("XHRリクエストURL", function() {
                actions.calculate(context);
                assert.equal(requests[0].url, "https://nameless-falls-59671.herokuapp.com");
            });
            it("XHRリクエストがJSONRPC2.0に準拠している", function() {
                actions.calculate(context);
                const parsedBody = JSON.parse(requests[0].requestBody);
                // The jsonrpc is a string specifying the version of the JSON-RPC protocol. MUST be exactly "2.0".
                assert.strictEqual(parsedBody.jsonrpc, "2.0");
                // If the id is not included it is assumed to be a notification.
                assert("id" in parsedBody);
                // The id MUST contain a String, Number, or NULL value if included. The value SHOULD normally not be Null.
                assert.notStrictEqual(parsedBody.id, null);
                assert(typeof parsedBody.id === "string" || typeof parsedBody.id === "number");
                if (typeof parsedBody.id === "number") {
                    assert.equal(Math.floor(parsedBody.id), parsedBody.id);
                }
                // The method is a string containing the name of the method to be invoked.
                // Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.
                assert.equal(typeof parsedBody.method, "string");
                assert(!parsedBody.method.startsWith("rpc."));
                // The params is a structured value that holds the parameter values to be used during the invocation of the method. This member MAY be omitted.
                if ("params" in parsedBody) {
                    assert.equal(typeof parsedBody.params, "object");
                }
            });
            it("JSONRPCのメソッド名はframe.calculate", function() {
                actions.calculate(context);
                assert.equal(JSON.parse(requests[0].requestBody).method, "frame.calculate");
            });
            it("JSONRPCのパラメータオブジェクトは、model=state.modeldataInput", function() {
                state.modeldataInput = createMockInput();
                actions.calculate(context);
                const parsedBody = JSON.parse(requests[0].requestBody);
                assert("params" in parsedBody);
                if (Array.isArray(parsedBody.params)) {
                    assert.deepStrictEqual(parsedBody.params[0], state.modeldataInput);
                } else {
                    assert.deepStrictEqual(parsedBody.params.model, state.modeldataInput);
                }
            });
            it("正常なサーバーレスポンスはmodeldataResultに格納される", function() {
                state.modeldataInput = createMockInput();
                actions.calculate(context);
                const res = createJsonRpcResponse(requests[0]);
                requests[0].respond(200, {}, res);
                assert.deepStrictEqual(state.modeldataResult, JSON.parse(res).result);
            });
        });
    });
});
