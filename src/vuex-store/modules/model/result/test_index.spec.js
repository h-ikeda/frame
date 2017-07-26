import result from ".";
import assert from "assert";

const {actions} = result;

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
                function commit() {}
                actions.setData({dispatch, commit}, {
                    displacements: {},
                    reactions: {},
                    stresses: {}
                });
            });
        });
    });
});
