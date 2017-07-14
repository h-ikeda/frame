const plugin = global.requireSrc(__filename).default;
import assert from "assert";

describe("Sample modelプラグインのテスト", function() {
    it("model/input/setDataにinputモデルのデータが渡される", function() {
        let action, payload, count = 0;
        function dispatch(_action, _payload) {
            action = _action,
            payload = _payload;
            ++count;
        }
        plugin({dispatch});
        assert.equal(action, "model/input/setData");
        assert.equal(count, 1);
        let keys = Object.keys(payload);
        assert.equal(keys.length, 2);
        assert("data" in payload);
        assert("order" in payload);
        keys = Object.keys(payload.data);
        assert.equal(keys.length, 6);
        assert("nodes" in payload.data);
        assert("lines" in payload.data);
        assert("sections" in payload.data);
        assert("materials" in payload.data);
        assert("nodeloads" in payload.data);
        assert("boundaries" in payload.data);
        keys = Object.keys(payload.order);
        assert.equal(keys.length, 6);
        assert("nodes" in payload.order);
        assert("lines" in payload.order);
        assert("sections" in payload.order);
        assert("materials" in payload.order);
        assert("nodeloads" in payload.order);
        assert("boundaries" in payload.order);
    });
});
