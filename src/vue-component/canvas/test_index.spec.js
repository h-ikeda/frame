import component from "./index.vue";
import assert from "assert";
import {WebGLRenderer} from "three";

const {computed, methods} = component;

describe("canvasコンポーネントのテスト", function() {
    describe("computedのテスト", function() {
        describe("_rendererのテスト", function() {
            it("メソッドの存在確認", function() {
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
    describe("methodsのテスト", function() {
        describe("マウス・タッチハンドリング", function() {
            describe("panのテスト", function() {
                it("メソッドの存在確認", function() {
                    assert.equal(typeof methods.pan, "function");
                });
                it("this.translate2Dを呼び出す", function() {
                    const vm = {
                        count: 0,
                        translate2D(...args) {
                            ++this.count;
                            this.args = args;
                        }
                    };
                    methods.pan.call(vm, 10, 8.5);
                    assert.equal(vm.count, 1);
                    assert.equal(vm.args.length, 1);
                    assert.equal(vm.args[0][0], 10);
                    assert.equal(vm.args[0][1], -8.5);
                });
            });
            describe("orbitのテスト", function() {
                it("メソッドの存在確認", function() {
                    assert.equal(typeof methods.orbit, "function");
                });
                it("this.rotateを呼び出す", function() {
                    const vm = {
                        count: 0,
                        rotate(...args) {
                            ++this.count;
                            this.args = args;
                        }
                    };
                    methods.orbit.call(vm, 1, 2.2);
                    assert.equal(vm.count, 1);
                    assert.equal(vm.args.length, 1);
                    assert.equal(vm.args[0][0], 2.2);
                    assert.equal(vm.args[0][1], 1);
                });
            });
            describe("scaleのテスト", function() {
                it("メソッドの存在確認", function() {
                    assert.equal(typeof methods.scale, "function");
                });
                it("this.rotateを呼び出す", function() {
                    const vm = {
                        count: 0,
                        zoom(...args) {
                            ++this.count;
                            this.args = args;
                        }
                    };
                    methods.scale.call(vm, 1.1);
                    assert.equal(vm.count, 1);
                    assert.equal(vm.args.length, 1);
                    assert.equal(vm.args[0], 1.1);
                });
            });
            describe("mouseイベントの処理", function() {
                before(function() {
                    this.MouseEvent = (type, init) => {
                        try {
                            return new MouseEvent(type, init);
                        } catch(e) {
                            const evt = document.createEvent("MouseEvents");
                            const {
                                bubbles,
                                cancelable,
                                screenX,
                                screenY,
                                clientX,
                                clientY,
                                ctrlKey,
                                altKey,
                                shiftKey,
                                metaKey,
                                button,
                                relatedTarget
                            } = init || {};
                            evt.initMouseEvent(type, bubbles, cancelable, window, 0, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
                            return evt;
                        }
                    };
                });
                it("handleMousedownでマウスイベントをキャプチャ", function() {
                    const vm = {};
                    const e = this.MouseEvent("mousedown");
                    methods.handleMousedown.call(vm, e);
                    assert.equal(vm.mouseEvent, e);
                });
                it("handleMousemoveでthis.panを呼び出す", function() {
                    const vm = {
                        mouseEvent: new this.MouseEvent("mousedown", {
                            clientX: 324,
                            clientY: 225
                        }),
                        count: 0,
                        pan(x, y) {
                            this.argX = x;
                            this.argY = y;
                            ++this.count;
                        }
                    };
                    methods.handleMousemove.call(vm, new this.MouseEvent("mousemove", {
                        clientX: 424,
                        clientY: 375
                    }));
                    assert.equal(vm.count, 1);
                    assert.equal(vm.argX, -100);
                    assert.equal(vm.argY, -150);
                });
                it("Ctrl押下時、handleMousemoveでthis.orbitを呼び出す", function() {
                    const vm = {
                        mouseEvent: new this.MouseEvent("mousedown", {
                            clientX: 324,
                            clientY: 225
                        }),
                        count: 0,
                        orbit(x, y) {
                            this.argX = x;
                            this.argY = y;
                            ++this.count;
                        }
                    };
                    methods.handleMousemove.call(vm, new this.MouseEvent("mousemove", {
                        clientX: 424,
                        clientY: 375,
                        ctrlKey: true
                    }));
                    assert.equal(vm.count, 1);
                    assert.equal(vm.argX, -100);
                    assert.equal(vm.argY, -150);
                });
                it("handleMouseupでマウスイベントをクリア", function() {
                    const vm = {
                        mouseEvent: new this.MouseEvent("mousemove")
                    };
                    methods.handleMouseup.call(vm, new this.MouseEvent("mouseup"));
                    assert.strictEqual(vm.mouseEvent, null);
                });
            });
        });
    });
});
