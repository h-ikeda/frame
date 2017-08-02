import displacements from ".";
import assert from "assert";

const {getters} = displacements;

describe("displacementsモジュールのテスト", function() {
    describe("gettersのテスト", function() {
        describe("maxのテスト", function() {
            it("各方向の最大変位を返す", function() {
                const state = {
                    data: {
                        abc: {
                            x: 0.1,
                            y: 0.13,
                            z: 1.1,
                            rx: 0.24,
                            ry: 1.32,
                            rz: 1.02
                        },
                        cde: {
                            x: 0.13,
                            y: 0.12,
                            z: 1.15,
                            rx: 0.24,
                            ry: 0.32,
                            rz: 1.12
                        },
                        efg: {
                            x: 0.19,
                            y: 0.11,
                            z: 1.9,
                            rx: -0.24,
                            ry: -1.32,
                            rz: -1.00
                        }
                    }
                };
                const result = getters.max(state);
                const expected = {
                    x: 0.19,
                    y: 0.13,
                    z: 1.9,
                    rx: 0.24,
                    ry: 1.32,
                    rz: 1.12
                };
                assert.equal(typeof result, "object");
                ["x" ,"y", "z", "rx", "ry", "rz"].forEach((c) => {
                    assert(c in result);
                    assert.equal(result[c], expected[c]);
                });
            });
        });
    });
});
