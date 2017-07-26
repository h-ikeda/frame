import assert from "assert";
import sampleModelPlugin from "./sample-model";

describe("sample-modelのテスト", function() {
    it("model/input/setDataが1回だけdispatchされる。", function() {
        let dispatchedAction, dispatchedPayload, count = 0;
        const store = {
            dispatch(action, payload) {
                ++count;
                dispatchedAction = action;
                dispatchedPayload = payload;
            }
        };
        sampleModelPlugin(store);
        assert.equal(count, 1);
        assert.equal(dispatchedAction, "model/input/setData");
        [
            "nodes",
            "lines",
            "sections",
            "materials",
            "boundaries",
            "nodeloads"
        ].forEach((key) => {
            assert(key in dispatchedPayload);
            assert.equal(typeof dispatchedPayload[key], "object");
        });
    });
});
