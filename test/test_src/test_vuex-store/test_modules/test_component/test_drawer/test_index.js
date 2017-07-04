const {mutations, actions} = global.requireSrc(__filename).default;
import assert from "assert";

describe("drawerモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setOpenedのテスト", function() {
            it("真偽値を渡すと、ステートにセットされる", function() {
                const state = {
                    opened: false
                };
                mutations.setOpened(state, true);
                assert(state.opened);
                mutations.setOpened(state, false);
                assert(!state.opened);
            });
        });
    });
    describe("actionsのテスト", function() {
        describe("openのテスト", function() {
            it("実行すると、setOpenedにtrueが渡される", function() {
                const commit = sinon.stub();
                actions.open({commit});
                assert(commit.calledOnce);
                assert(commit.withArgs("setOpened", true).calledOnce);
            });
        });
        describe("closeのテスト", function() {
            it("実行すると、setOpenedにfalseが渡される", function() {
                const commit = sinon.stub();
                actions.close({commit});
                assert(commit.calledOnce);
                assert(commit.withArgs("setOpened", false).calledOnce);
            });
        });
        describe("toggleのテスト", function() {
            it("実行すると、setOpenedにopenedの反対が渡される", function() {
                let commit = sinon.stub();
                const state = {opened: false};
                actions.toggle({commit, state});
                assert(commit.calledOnce);
                assert(commit.withArgs("setOpened", true).calledOnce);
                commit = sinon.stub();
                state.opened = true;
                actions.toggle({commit, state});
                assert(commit.calledOnce);
                assert(commit.withArgs("setOpened", false).calledOnce);
            });
        });
    });
});
