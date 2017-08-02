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
                const canvas = document.createElement("canvas");
                try {
                    if (!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))) {
                        // Skip test when WebGL disabled.
                        return;
                    };
                } catch (e) {
                    // Skip test when WebGL disabled.
        			return;
        		}
                const _this = {
                    $refs: {
                        canvas
                    }
                };
                const result = computed._renderer.apply(_this);
                assert(result instanceof WebGLRenderer);
            });
        });
    });
});
