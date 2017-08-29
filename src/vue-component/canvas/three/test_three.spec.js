import three from "./three";
import assert from "assert";
import Vue from "vue";

describe("threeコンポーネント(mixin)のテスト", function() {
    describe("assetsのテスト", function() {
        it("コンポーネント自身のプロパティにアクセスできる", function() {
            const vm = new Vue({
                mixins: [three]
            });
            vm.assets.materials.a = "data-a";
            assert.equal(vm.assets.materials.a, "data-a");
        });
        it("親コンポーネントのプロパティにアクセスできる", function() {
            const vm = new Vue({
                components: {
                    child: {
                        mixins: [three]
                    },
                    parent: {
                        mixins: [three]
                    }
                },
                template: `<parent ref="p"><child ref="c" /></parent>`
            }).$mount();
            vm.$refs.p.assets.materials.b = "data-b";
            assert.equal(vm.$refs.c.assets.materials.b, "data-b");
        });
    });
});
