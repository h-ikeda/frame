import renderer from "./renderer.vue";
import assert from "assert";
import Vue from "vue";
import {WebGLRenderer} from "three";

function detectWebGLContext() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return context && context instanceof WebGLRenderingContext;
}

describe("rendererコンポーネントのテスト", function() {
    it("rendererの描画対象(domElement)はVueが生成したcanvas。", function() {
        if (!detectWebGLContext()) {
            console.log("WebGL is not supported. Skip testing.");
            this.skip();
        }
        const vm = new Vue(renderer);
        vm.$mount();
        assert.equal(vm.instance.domElement, vm.$refs.renderer);
    });
    it("rendererオプションを変更すると、canvasエレメントが置換される。", function(done) {
        if (!detectWebGLContext()) {
            console.log("WebGL is not supported. Skip testing.");
            this.skip();
        }
        const vm = new Vue(renderer);
        vm.$mount();
        const initCanvas = vm.$refs.renderer;
        vm.antialias = true;
        Vue.nextTick(() => {
            assert.equal(vm.$refs.renderer.tagName, "CANVAS");
            assert.notEqual(vm.$refs.renderer, initCanvas);
            done();
        });
    });
    it("rendererオプションを変更すると、rendererが再生成される。", function(done) {
        if (!detectWebGLContext()) {
            console.log("WebGL is not supported. Skip testing.");
            this.skip();
        }
        const vm = new Vue(renderer);
        vm.$mount();
        const initRenderer = vm.instance;
        vm.antialias = true;
        Vue.nextTick(() => {
            assert(vm.instance instanceof WebGLRenderer);
            assert.notEqual(vm.instance, initRenderer);
            done();
        });
    });
    it("再生成されたrendererの描画対象(domElement)は、新しいcanvas要素。", function(done) {
        if (!detectWebGLContext()) {
            console.log("WebGL is not supported. Skip testing.");
            this.skip();
        }
        const vm = new Vue(renderer);
        vm.$mount();
        vm.antialias = true;
        Vue.nextTick(() => {
            assert.equal(vm.instance.domElement, vm.$refs.renderer);
            done();
        });
    });
});
