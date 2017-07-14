const {actions} = global.requireSrc(__filename).default;
import assert from "assert";

describe("resultモジュールのテスト", function() {
    describe("actionsのテスト", function() {
        describe("setDataのテスト", function() {
            it("オブジェクトを渡すと、各モジュールのsetDataが呼ばれる。", function() {
                let action = [], payload = [], count = 0;
                function dispatch(_action, _payload) {
                    action.push(_action);
                    payload.push(_payload);
                    ++count;
                }
                actions.setData({dispatch}, {
                    data: {
                        displacements: {},
                        reactions: {},
                        stresses: {}
                    },
                    order: {
                        displacements: [],
                        reactions: [],
                        stresses: []
                    }
                });
            });
        });
    });
});
