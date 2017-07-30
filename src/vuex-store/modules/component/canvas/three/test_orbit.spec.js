import orbit from "./orbit";
import assert from "assert";
import {Vector3} from "three";

const {getters, actions} = orbit;

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
                assert(Math.abs(result.getComponent(index) - expected) < .0000000000000015);
            });
        });
    });
    describe("actionsのテスト", function() {
        it("translateのテスト", function() {
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
        it("rotateのテスト", function() {
            let mutation, payload, count = 0;
            function commit(_mutation, _payload) {
                mutation = _mutation;
                payload = _payload;
                ++count;
            }
            const state = {
                spherical: [2, -8.1, 0]
            };
            actions.rotate({commit, state}, [3, -29]);
            assert.equal(count, 1);
            assert.equal(mutation, "setSpherical");
            [2, -5.1, -29].forEach((expected, index) => {
                assert.equal(payload[index], expected);
            });
        });
        it("zoomのテスト", function() {
            let mutation, payload, count = 0;
            function commit(_mutation, _payload) {
                mutation = _mutation;
                payload = _payload;
                ++count;
            }
            const state = {
                spherical: [2, -8.1, 0]
            };
            actions.zoom({commit, state}, 1.6);
            assert.equal(count, 1);
            assert.equal(mutation, "setSpherical");
            [3.2, -8.1, 0].forEach((expected, index) => {
                assert.equal(payload[index], expected);
            });
        });
    });
});
