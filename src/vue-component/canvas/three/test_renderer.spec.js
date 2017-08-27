import renderer from "./renderer.vue";
import assert from "assert";
import Vue from "vue";

describe("rendererコンポーネントのテスト", function() {
    it("オプションを変更すると、新しいrendererに置き換えられる。", function(done) {
        const vm = new Vue({
            template: `<renderer :antialias="aa" ref="rdr" />`,
            data() {
                return {
                    aa: false
                };
            },
            components: {
                renderer
            }
        });
        vm.$mount();
        const firstKey = vm.$refs.rdr.key;
        const firstRenderer = vm.$refs.rdr.instance;
        const firstCanvas = vm.$refs.rdr.$refs.renderer;
        assert.equal(vm.$refs.rdr.key, firstKey);
        assert.equal(vm.$refs.rdr.instance, firstRenderer);
        assert.equal(vm.$refs.rdr.$refs.renderer, firstCanvas);
        assert.equal(firstRenderer.domElement, firstCanvas);
        vm.aa = true;
        Vue.nextTick(() => {
            assert.equal(vm.$refs.rdr.key, firstKey + 1);
            assert.equal(vm.$refs.rdr.instance, undefined);
            const secondCanvas = vm.$refs.rdr.$refs.renderer;
            assert.notEqual(secondCanvas, firstCanvas);
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.key, firstKey + 1);
                assert.equal(vm.$refs.rdr.$refs.renderer, secondCanvas);
                assert.equal(secondCanvas, vm.$refs.rdr.instance.domElement);
                done();
            });
        });
    });
});
