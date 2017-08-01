import module from ".";
import assert from "assert";

const {mutations} = module;

describe("threeモジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setCameraModeのテスト", function() {
            it("cameraModeの更新", function() {
                const state = {
                    cameraMode: "perspective"
                };
                mutations.setCameraMode(state, "orthographic");
                assert.equal(state.cameraMode, "orthographic");
            });
        });
        describe("setAntialiasのテスト", function() {
            it("antialiasの更新", function() {
                const state = {
                    antialias: true
                };
                mutations.setAntialias(state, false);
                assert(!state.antialias);
            });
        });
    });
});
