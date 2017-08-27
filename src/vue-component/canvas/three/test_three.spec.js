import three from "./three";
import assert from "assert";
import Vue from "vue";

const {parent} = three.computed;

describe("threeコンポーネント(mixin)のテスト", function() {
    describe("computedのテスト", function() {
        describe("parentのテスト", function() {
            describe("this.$options.threeがtrueとなるコンポーネントを再帰的にたどる。", function() {
                it("1階層", function() {
                    const vm = {
                        $options: {},
                        $parent: {
                            $options: {
                                three: true
                            },
                            $parent: {
                                $options: {
                                    three: true
                                },
                                $parent: {
                                    $options: {},
                                    $parent: {
                                        $options: {
                                            three: true
                                        },
                                        $parent: {
                                            $options: {}
                                        }
                                    }
                                }
                            }
                        }
                    };
                    const result = parent.call(vm);
                    assert.equal(result, vm.$parent);
                });
                it("2階層", function() {
                    const vm = {
                        $options: {},
                        $parent: {
                            $options: {},
                            $parent: {
                                $options: {
                                    three: true
                                },
                                $parent: {
                                    $options: {},
                                    $parent: {
                                        $options: {
                                            three: true
                                        },
                                        $parent: {
                                            $options: {}
                                        }
                                    }
                                }
                            }
                        }
                    };
                    const result = parent.call(vm);
                    assert.equal(result, vm.$parent.$parent);
                });
                it("ルートエレメントの時は、$emit関数を持つオブジェクトを返す。", function() {
                    const vm = {
                        $options: {},
                        $parent: {
                            $options: {},
                            $parent: {
                                $options: {},
                                $parent: {
                                    $options: {},
                                    $parent: {
                                        $options: {},
                                        $parent: {
                                            $options: {}
                                        }
                                    }
                                }
                            }
                        }
                    };
                    const result = parent.call(vm);
                    assert.notEqual(result, vm.$parent);
                    assert.notEqual(result, vm.$parent.$parent);
                    assert.notEqual(result, vm.$parent.$parent.$parent);
                    assert.notEqual(result, vm.$parent.$parent.$parent.$parent);
                    assert.notEqual(result, vm.$parent.$parent.$parent.$parent.$parent);
                    assert.equal(typeof result.$emit, "function");
                });
            });
            it("threeの子コンポーネントのとき、this.$parentを返す。", function() {
                const vm = new Vue({
                    components: {
                        "three-component": three
                    },
                    template: `<three-component ref="p"><three-component ref="c" /></three-component>`
                }).$mount();
                assert.equal(vm.$refs.c.parent, vm.$refs.p);
            });
            it("threeの孫コンポーネントのとき、this.$parent.$parentを返す。", function() {
                const vm = new Vue({
                    components: {
                        "three-component": three,
                        "other-component": {
                            template: "<div><slot /></div>"
                        }
                    },
                    template: `<three-component ref="p"><other-component><three-component ref="c" /></other-component></three-component>`
                }).$mount();
                assert.equal(vm.$refs.c.parent, vm.$refs.p);
            });
        });
    });
});
