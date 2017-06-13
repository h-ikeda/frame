const plugin = global.requireSrc(__filename).default;
import assert from "assert";

describe("Sample modelプラグインのテスト", function() {
    it("model/input/setDataにinputモデルのデータが渡される", function() {
        const commit = sinon.stub();
        plugin({commit});
        assert(commit.withArgs("model/input/setData", sinon.match({
            nodes: {},
            lines: {},
            sections: {},
            materials: {},
            nodeloads: {},
            boundaries: {}
        })).calledOnce);
    });
});
