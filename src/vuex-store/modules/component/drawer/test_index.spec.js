import drawer from ".";
import assert from "assert";

const {mutations, actions} = drawer;

describe("drawerモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setOpenのテスト", function() {
            it("真偽値を渡すと、ステートにセットされる", function() {
                const state = {
                    open: false
                };
                mutations.setOpen(state, true);
                assert(state.open);
                mutations.setOpen(state, false);
                assert(!state.open);
            });
        });
    });
    describe("actionsのテスト", function() {
        describe("toggleOpenのテスト", function() {
            it("実行すると、setOpenedにopenedの反対が渡される", function() {
                let committedMutation, committedPayload, count = 0;
                function commit(mutation, payload) {
                    ++count;
                    committedMutation = mutation;
                    committedPayload = payload;
                }
                const state = {open: false};
                actions.toggleOpen({commit, state});
                assert.equal(count, 1);
                assert.equal(committedMutation, "setOpen");
                assert.equal(committedPayload, true);
                state.open = true;
                actions.toggleOpen({commit, state});
                assert.equal(count, 2);
                assert.equal(committedMutation, "setOpen");
                assert.strictEqual(committedPayload, false);
            });
        });
    });
});
