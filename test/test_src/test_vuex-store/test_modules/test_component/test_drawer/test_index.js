const {mutations} = global.requireSrc(__filename).default;
import assert from "assert";

describe("drawerモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("toggleOpenのテスト", function() {
            it("実行すると、ステートの値が反転する", function() {
                const state = {
                    open: false
                };
                mutations.toggleOpen(state);
                assert(state.open);
                mutations.toggleOpen(state);
                assert(!state.open);
            });
        });
    });
});
