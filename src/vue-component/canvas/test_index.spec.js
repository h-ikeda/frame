import component from "./index.vue";
import assert from "assert";
import {WebGLRenderer} from "three";

const {computed} = component;

describe("canvasコンポーネントのテスト", function() {
    describe("computedのテスト", function() {
        describe("_rendererのテスト", function() {
            it("_rendererメソッドの存在確認", function() {
                assert.equal(typeof computed._renderer, "function");
            });
            it("_rendererメソッドはWebGLRendererのインスタンスを返す", function() {
                const _this = {
                    $refs: {
                        canvas: document.createElement("canvas")
                    }
                };
                const result = computed._renderer.apply(_this);
                assert(result instanceof WebGLRenderer);
            });
        });
    });
});
