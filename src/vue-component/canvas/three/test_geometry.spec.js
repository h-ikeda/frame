import geometry from "./geometry";
import assert from "assert";
import Vue from "vue";
import three from "./three";
import {BoxGeometry, CircleGeometry} from "three";

describe("geometryコンポーネントのテスト", function() {
    describe("instanceが親コンポーネントのassetに適切にセットされる。", function() {
        it("起動すると、instanceがthis.parent.assets.geometriesにセットされる。", function() {
            const vm = new Vue({
                template: `<three ref="p"><geometry ref="g" name="x" /></three>`,
                components: {
                    three,
                    geometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
        });
        it("破棄すると、instanceがthis.parent.assets.geometriesから取り除かれる。", function(done) {
            const vm = new Vue({
                template: `<three ref="p"><geometry ref="g" v-if="on" name="x" /></three>`,
                data: {
                    on: true
                },
                components: {
                    three,
                    geometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
            vm.on = false;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.p.assets.geometries.x, undefined);
                done();
            });
        });
        it("instanceを再生成すると、this.parent.assets.geometriesに反映される。", function(done) {
            const vm = new Vue({
                template: `<three ref="p"><geometry-ex ref="g" name="x" /></three>`,
                components: {
                    three,
                    "geometry-ex": {
                        mixins: [geometry],
                        computed: {
                            instance() {
                                if (this.sw) {
                                    return new BoxGeometry(1, 1, 1);
                                }
                                return new CircleGeometry();
                            }
                        },
                        data() {
                            return {
                                sw: false
                            };
                        }
                    }
                }
            });
            vm.$mount();
            assert(vm.$refs.g.instance instanceof CircleGeometry);
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
            vm.$refs.g.sw = true;
            Vue.nextTick(() => {
                assert(vm.$refs.g.instance instanceof BoxGeometry);
                assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
                done();
            });
        });
        it("同じnameプロパティを持つコンポーネントに入れ替える場合。", function(done) {
            const vm = new Vue({
                template: `<three ref="p"><geometry ref="g" v-if="on" name="x" /><geometry ref="h" v-else name="x" /></three>`,
                data: {
                    on: false
                },
                components: {
                    three,
                    geometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.h.instance);
            assert.equal(vm.$refs.g, undefined);
            vm.on = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
                assert.equal(vm.$refs.h, undefined);
                done();
            });
        });
    });
});
