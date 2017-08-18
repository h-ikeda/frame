import nodesComponent from "./nodes.vue";
import assert from "assert";

const {computed} = nodesComponent;

describe("Canvas nodes コンポーネントのテスト", function() {
    describe("computedのテスト", function() {
        describe("points関数のテスト", function() {
            it("points関数は、id, pos, propsプロパティを持つオブジェクトの配列を返す。", function() {
                const vm = {
                    data: {
                        abcde: {
                            x: 1.8,
                            y: 90,
                            z: -24
                        },
                        cdefg: {
                            x: 2.8,
                            y: 80,
                            z: -90
                        },
                        efgh: {
                            x: 9,
                            y: -3,
                            z: 60
                        }
                    },
                    nodeStyle: {
                        color: "#ff0000",
                        size: 2
                    }
                };
                const result = computed.points.call(vm);
                assert.equal(result.length, 3);
                for (let i = 0; i < 3; ++i) {
                    ["id", "pos", "props"].forEach((key) => {
                        assert(key in result[i]);
                    });
                }
            });
            it("posは x, y, z の配列を表す文字列。", function() {
                const vm = {
                    data: {
                        abcde: {
                            x: 1.8,
                            y: 90,
                            z: -24
                        },
                        cdefg: {
                            x: 2.8,
                            y: 80,
                            z: -90
                        },
                        efgh: {
                            x: 9,
                            y: -3,
                            z: 60
                        }
                    },
                    nodeStyle: {
                        color: "#ff0000",
                        size: 2
                    }
                };
                const result = computed.points.call(vm);
                const expected = {
                    abcde: "1.8 90 -24",
                    cdefg: "2.8 80 -90",
                    efgh: "9 -3 60"
                };
                result.forEach((item) => {
                    assert.equal(item.pos, expected[item.id]);
                });
            });
        });
    });
});