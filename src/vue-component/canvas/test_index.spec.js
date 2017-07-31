import component from "./index.vue";
import assert from "assert";
import {WebGLRenderer} from "three";

const {computed} = component;

describe("canvasコンポーネントのテスト", function() {
    describe("computedのテスト", function() {
        describe("rendererのテスト", function() {
            it("rendererメソッドの存在確認", function() {
                assert.equal(typeof computed.renderer, "function");
            });
            it("rendererメソッドはWebGLRendererのインスタンスを返す", function() {
                const _this = {
                    $refs: {}
                };
                const result = computed.renderer.apply(_this);
                assert(result instanceof WebGLRenderer);
            });
        });
    });
});
