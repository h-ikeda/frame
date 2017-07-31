import orbit from "./orbit";
import assert from "assert";
import {Vector3} from "three";

const {getters, mutations, actions} = orbit;

describe("Orbitモジュールのテスト", function() {
    describe("gettersのテスト", function() {
        it("positionのテスト", function() {
            const state = {
                target: [1, 3.1, -2],
                spherical: [20, Math.PI * .5, 0]
            };
            const result = getters.position(state);
            assert(result instanceof Vector3);
            [1, 3.1, 18].forEach((expected, index) => {
                assert(Math.abs(result.getComponent(index) - expected) < .0000000000000015, `${result.getComponent(index)} is not close to ${expected}.`);
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
                    target: [2, -8.1, 0]
                };
                actions.translate({commit, state}, [10.8, 3, -29]);
                assert.equal(count, 1);
                assert.equal(mutation, "setTarget");
                [12.8, -5.1, -29].forEach((expected, index) => {
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
                    spherical: [2, 1.3, 0.1]
                };
                actions.rotate({commit, state}, [1, 2]);
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
                    spherical: [2, 2.3, 0.1]
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
                    spherical: [2, 2.3, 0.1]
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
                    spherical: [2, 1.3, 0.1]
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
                    spherical: [2, 1.3, 0.1]
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
                    spherical: [3.2, -8.1, 0]
                };
                actions.zoom({commit, state}, 1.6);
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
                    spherical: [2, -8.1, 0]
                };
                actions.zoom({commit, state}, 0.5);
                assert.equal(count, 1);
                assert.equal(mutation, "setSpherical");
                [4, -8.1, 0].forEach((expected, index) => {
                    assert.equal(payload[index], expected);
                });
            });
        });
    });
});
