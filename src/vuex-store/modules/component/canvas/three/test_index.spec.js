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
        describe("setAcceralationのテスト", function() {
            it("acceralationの更新", function() {
                const state = {
                    acceralation: {
                        pan: 0.1,
                        rotation: 0.1,
                        zoom: 0.1
                    }
                };
                mutations.setAcceralation(state, {
                    pan: 0.9,
                    rotation: 0.8,
                    zoom: 0.04
                });
                assert.equal(state.acceralation.pan, 0.9);
                assert.equal(state.acceralation.rotation, 0.8);
                assert.equal(state.acceralation.zoom, 0.04);
            });
            it("一部のみ更新", function() {
                const state = {
                    acceralation: {
                        pan: 0.1,
                        rotation: 0.1,
                        zoom: 0.05
                    }
                };
                mutations.setAcceralation(state, {
                    pan: 0.9,
                    rotation: 0.8
                });
                assert.equal(state.acceralation.pan, 0.9);
                assert.equal(state.acceralation.rotation, 0.8);
                assert.equal(state.acceralation.zoom, 0.05);
            });
        });
    });
});
