//
// resultオブジェクトのモック（テスト用ダミーデータ）を作成します。
// valid() => 正常なresultオブジェクトを返す。
//

import uuid from "uuid/v4";
import assert from "assert";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomBoolean() {
    return Math.random() > 0.5;
}

function createDisplacement(range) {
    range = Math.abs(range);
    return {
        x: getRandomArbitary(-range, range),
        y: getRandomArbitary(-range, range),
        z: getRandomArbitary(-range, range),
        rx: getRandomArbitary(-range, range),
        ry: getRandomArbitary(-range, range),
        rz: getRandomArbitary(-range, range)
    };
}

function createReaction(range) {
    return createDisplacement(range);
}

function createStress() {
    return {};
}

function createResults(min, max, factory, ...args) {
    const t = {};
    for (let i = getRandomInt(min, max); 0 < i; --i) {
        const result = factory(...args);
        t[uuid()] = result;
    }
    return t;
}

export let valid = () => {
    const displacements = createResults(2, 100, createDisplacement, 100000);
    const reactions = createResults(1, 50, createReaction, 100000);
    const stresses = createResults(1, 50, createStress);
    return {
        displacements,
        reactions,
        stresses
    };
};

describe("mock-result-factoriesのセルフチェック", function() {
    it("getRandomIntは整数を返す", function() {
        const r = getRandomInt(-20, 10);
        assert.equal(typeof r, "number");
        assert(r > -20.1);
        assert(r < 10.1);
        assert.equal(r, Math.ceil(r));
        assert.equal(r, Math.floor(r));
    });
    it("getRandomArbitaryは数値を返す", function() {
        const r = getRandomArbitary(-20, 10);
        assert.equal(typeof r, "number");
        assert(r > -20.1);
        assert(r < 10.1);
    });
    it("getRandomBooleanは真偽値を返す", function() {
        const r = getRandomBoolean();
        assert.equal(typeof r, "boolean");
    });
    it("createDisplacementはx, y, z, rx, ry, rzを持つオブジェクト", function() {
        const r = createDisplacement(20);
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["x", "y", "z", "rx", "ry", "rz"]);
        assert.equal(typeof r.x, "number");
        assert.equal(typeof r.y, "number");
        assert.equal(typeof r.z, "number");
        assert.equal(typeof r.rx, "number");
        assert.equal(typeof r.ry, "number");
        assert.equal(typeof r.rz, "number");
        assert(r.x < 20.1);
        assert(r.x > -20.1);
        assert(r.y < 20.1);
        assert(r.y > -20.1);
        assert(r.z < 20.1);
        assert(r.z > -20.1);
        assert(r.rx < 20.1);
        assert(r.rx > -20.1);
        assert(r.ry < 20.1);
        assert(r.ry > -20.1);
        assert(r.rz < 20.1);
        assert(r.rz > -20.1);
    });
    it("createReactionは、x, y, z, rx, ry, rzを持つオブジェクト", function() {
        const r = createReaction(20);
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["x", "y", "z", "rx", "ry", "rz"]);
        assert.equal(typeof r.x, "number");
        assert.equal(typeof r.y, "number");
        assert.equal(typeof r.z, "number");
        assert.equal(typeof r.rx, "number");
        assert.equal(typeof r.ry, "number");
        assert.equal(typeof r.rz, "number");
        assert(r.x < 20.1);
        assert(r.x > -20.1);
        assert(r.y < 20.1);
        assert(r.y > -20.1);
        assert(r.z < 20.1);
        assert(r.z > -20.1);
        assert(r.rx < 20.1);
        assert(r.rx > -20.1);
        assert(r.ry < 20.1);
        assert(r.ry > -20.1);
        assert(r.rz < 20.1);
        assert(r.rz > -20.1);
    });
    it("createResultsを、argsなしで呼び出す", function() {
        let i = 0;
        function factory() {
            return {count: i++};
        }
        const r = createResults(1, 200, factory);
        assert.equal(typeof r, "object");
        assert.equal(i, Object.keys(r).length);
    });
});
