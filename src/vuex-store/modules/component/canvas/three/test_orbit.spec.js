import orbit from "./orbit";
import assert from "assert";

const {getters, mutations, actions} = orbit;

describe("Orbitモジュールのテスト", function() {
    describe("gettersのテスト", function() {
        it("positionのテスト", function() {
            const state = {
                target: [1, 3.1, -2],
                spherical: [20, Math.PI * .5, 0]
            };
            const result = getters.position(state);
            assert(result.isVector3);
            [1, 3.1, 18].forEach((expected, index) => {
                assert(Math.abs(result.getComponent(index) - expected) < .0000000000000015, `${result.getComponent(index)} is not close to ${expected}.`);
            });
        });
        it("targetのテスト", function() {
            const state = {
                target: [0.8, 9.998, -20]
            };
            const result = getters.target(state);
            assert(result.isVector3);
            [0.8, 9.998, -20].forEach((expected, index) => {
                assert.equal(result[String.fromCharCode("x".charCodeAt() + index)], expected);
            });
        });
    });
    describe("mutationsのテスト", function() {
        it("setTargetのテスト", function() {
            const state = {
                target: [1, 2, 3]
            };
            mutations.setTarget(state, [6, 7, 8]);
            [6, 7, 8].forEach((expected, index) => {
                assert.equal(state.target[index], expected);
            });
        });
        it("setSphericalのテスト", function() {
            const state = {
                spherical: [2, 3, 4]
            };
            mutations.setSpherical(state, [11, 1.3, 2.8]);
            [11, 1.3, 2.8].forEach((expected, index) => {
                assert.equal(state.spherical[index], expected);
            });
        });
        describe("setMagnifyのテスト", function() {
            it("magnifyの更新", function() {
                const state = {
                    magnify: {
                        translate: 0.1,
                        rotate: 0.1,
                        zoom: 0.1
                    }
                };
                mutations.setMagnify(state, {
                    translate: 0.9,
                    rotate: 0.8,
                    zoom: 0.04
                });
                assert.equal(state.magnify.translate, 0.9);
                assert.equal(state.magnify.rotate, 0.8);
                assert.equal(state.magnify.zoom, 0.04);
            });
            it("一部のみ更新", function() {
                const state = {
                    magnify: {
                        translate: 0.1,
                        rotate: 0.1,
                        zoom: 0.05
                    }
                };
                mutations.setMagnify(state, {
                    translate: 0.9,
                    rotate: 0.8
                });
                assert.equal(state.magnify.translate, 0.9);
                assert.equal(state.magnify.rotate, 0.8);
                assert.equal(state.magnify.zoom, 0.05);
            });
        });
    });
    describe("actionsのテスト", function() {
        describe("translateのテスト", function() {
            it("平行移動", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    target: [2, -8.1, 0],
                    magnify: {
                        translate: 0.1
                    }
                };
                actions.translate({commit, state}, [10.8, 3, -280]);
                assert.equal(count, 1);
                assert.equal(mutation, "setTarget");
                [3.08, -7.8, -28].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
        });
        describe("rotateのテスト", function() {
            it("φを1rad、θを3rad回転する", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [2, 1.3, 0.1],
                    magnify: {
                        rotate: 0.5
                    }
                };
                actions.rotate({commit, state}, [2, 4]);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [2, 2.3, 2.1].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
            it ("φ ≦ π", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [2, 2.3, 0.1],
                    magnify: {
                        rotate: 1
                    }
                };
                actions.rotate({commit, state}, [2, 2]);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [2, Math.PI, 2.1].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
            it ("0 ≦ φ", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [2, 2.3, 0.1],
                    magnify: {
                        rotate: 1
                    }
                };
                actions.rotate({commit, state}, [-3, 2]);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [2, 0, 2.1].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
            it("θが2πを超えると、0～2πに換算される", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [2, 1.3, 0.1],
                    magnify: {
                        rotate: 1
                    }
                };
                actions.rotate({commit, state}, [1, 10]);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [2, 2.3, 10.1 % (2 * Math.PI)].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
            it("θが0を下回ると、0～2πに換算される", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [2, 1.3, 0.1],
                    magnify: {
                        rotate: 1
                    }
                };
                actions.rotate({commit, state}, [1, -10]);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [2, 2.3, 2 * Math.PI - 9.9 % (2 * Math.PI)].forEach((expected, index) => {
                    assert(Math.abs(payload[index] - expected) < 0.000000000000001, `${payload[index]} is not close to ${expected}.`);
                });
            });
        });
        describe("zoomのテスト", function() {
            it("望遠", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [3, -8.1, 0],
                    magnify: {
                        zoom: 2
                    }
                };
                actions.zoom({commit, state}, 0.25);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [2, -8.1, 0].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
            it("広角", function() {
                let mutation, payload, count = 0;
                function commit(_mutation, _payload) {
                    mutation = _mutation;
                    payload = _payload;
                    ++count;
                }
                const state = {
                    spherical: [2, -8.1, 0],
                    magnify: {
                        zoom: 0.5
                    }
                };
                actions.zoom({commit, state}, -1);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [4, -8.1, 0].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
        });
        describe("translate2Dのテスト", function() {
            it("カメラ視線がxy平面に直行しているとき", function() {
                const state = {
                    spherical: [30.8, Math.PI / 2, 0]
                };
                let action, payload, count = 0;
                function dispatch(_action, _payload) {
                    ++count;
                    action = _action;
                    payload = _payload;
                }
                actions.translate2D({dispatch, state}, [21, -5.9]);
                assert.equal(count, 1);
                assert.equal(action, "translate");
                [21, -5.9, 0].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
            it("カメラ視線がzy平面に直行しているとき", function() {
                const state = {
                    spherical: [30.8, Math.PI / 2, -Math.PI / 2]
                };
                let action, payload, count = 0;
                function dispatch(_action, _payload) {
                    ++count;
                    action = _action;
                    payload = _payload;
                }
                actions.translate2D({dispatch, state}, [21, -5.9]);
                assert.equal(count, 1);
                assert.equal(action, "translate");
                [0, -5.9, 21].forEach((expected, index) => {
                    assert(Math.abs(payload[index] - expected) < 1e-14, `${payload[index]} is not close to ${expected}.`);
                });
            });
            it("カメラ視線がxz平面に直行しているとき", function() {
                const state = {
                    spherical: [30.8, Math.PI, 0]
                };
                let action, payload, count = 0;
                function dispatch(_action, _payload) {
                    ++count;
                    action = _action;
                    payload = _payload;
                }
                actions.translate2D({dispatch, state}, [21, -5.9]);
                assert.equal(count, 1);
                assert.equal(action, "translate");
                [21, 0, -5.9].forEach((expected, index) => {
                    assert(Math.abs(payload[index] - expected) < 1e-14, `${payload[index]} is not close to ${expected}.`);
                });
            });
        });
    });
});
