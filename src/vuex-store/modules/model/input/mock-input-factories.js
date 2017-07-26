//
// inputオブジェクトのモック（テスト用ダミーデータ）を作成します。
// valid() => 正常なinputオブジェクトを返す。
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

function createNode(range) {
    range = Math.abs(range);
    return {
        x: getRandomArbitary(-range, range),
        y: getRandomArbitary(-range, range),
        z: getRandomArbitary(-range, range)
    };
}

function createLine(nodes, sections, materials) {
    const n = Object.keys(nodes);
    const s = Object.keys(sections);
    const m = Object.keys(materials);
    const n1 = getRandomInt(0, n.length - 1);
    let n2;
    do {
        n2 = getRandomInt(0, n.length - 1);
    } while (n1 === n2)
    return {
        n1: n[n1],
        n2: n[n2],
        section: s[getRandomInt(0, s.length - 1)],
        material: m[getRandomInt(0, m.length - 1)]
    };
}

function lineFilter(line, lines) {
    return !Object.keys(lines).some((key) => {
        const n1 = lines[key][n1];
        const n2 = lines[key][n2];
        if (line[n1] === n1 && line[n2] === n2 || line[n1] === n2 && line[n2] === n1) {
            return true;
        }
    });
}

function createSection() {
    const candidates = [{
        shape: "H",
        B: getRandomArbitary(100, 1000),
        H: getRandomArbitary(100, 1000),
        tf: getRandomArbitary(0.001, 24.9),
        tw: getRandomArbitary(0.001, 24.9),
        r: getRandomArbitary(0, 24.9)
    }];
    return candidates[getRandomInt(0, candidates.length - 1)];
}

function createMaterial() {
    return {
        E: getRandomArbitary(0.0001, 1000000),
        G: getRandomArbitary(0.0001, 1000000)
    };
}

function createBoundary(nodes) {
    const n = Object.keys(nodes);
    return {
        node: n[getRandomInt(0, n.length - 1)],
        x: getRandomBoolean() ? getRandomArbitary(0, 1000000): getRandomBoolean(),
        y: getRandomBoolean() ? getRandomArbitary(0, 1000000): getRandomBoolean(),
        z: getRandomBoolean() ? getRandomArbitary(0, 1000000): getRandomBoolean(),
        rx: getRandomBoolean() ? getRandomArbitary(0, 1000000): getRandomBoolean(),
        ry: getRandomBoolean() ? getRandomArbitary(0, 1000000): getRandomBoolean(),
        rz: getRandomBoolean() ? getRandomArbitary(0, 1000000): getRandomBoolean()
    };
}

function createNodeload(nodes) {
    const n = Object.keys(nodes);
    return {
        node: n[getRandomInt(0, n.length - 1)],
        x: getRandomArbitary(-1000000, 1000000),
        y: getRandomArbitary(-1000000, 1000000),
        z: getRandomArbitary(-1000000, 1000000),
        rx: getRandomArbitary(-1000000, 1000000),
        ry: getRandomArbitary(-1000000, 1000000),
        rz: getRandomArbitary(-1000000, 1000000)
    };
}

function createMembers(min, max, filter, factory, ...args) {
    const t = {};
    for (let i = getRandomInt(min, max); 0 < i; --i) {
        const member = factory(...args);
        if (typeof filter !== "function" || filter(member, t)) {
            t[uuid()] = member;
        }
    }
    return t;
}

export let valid = () => {
    const nodes = createMembers(2, 100, null, createNode, 100000);
    const sections = createMembers(1, 50, null, createSection);
    const materials = createMembers(1, 50, null, createMaterial);
    const lines = createMembers(1, Object.keys(nodes).length, lineFilter, createLine, nodes, sections, materials);
    const boundaries = createMembers(1, 100, null, createBoundary, nodes);
    const nodeloads = createMembers(0, 100, null, createNodeload, nodes);
    return {
        nodes,
        lines,
        sections,
        materials,
        boundaries,
        nodeloads
    };
};

describe("mock-input-factoriesのセルフチェック", function() {
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
    it("createNodeはx, y, zを持つオブジェクト", function() {
        const r = createNode(20);
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["x", "y", "z"]);
        assert.equal(typeof r.x, "number");
        assert.equal(typeof r.y, "number");
        assert.equal(typeof r.z, "number");
        assert(r.x < 20.1);
        assert(r.x > -20.1);
        assert(r.y < 20.1);
        assert(r.y > -20.1);
        assert(r.z < 20.1);
        assert(r.z > -20.1);
    });
    it("createSectionは、shapeとその他のプロパティを持つオブジェクト", function() {
        const r = createSection();
        assert.equal(typeof r, "object");
        assert("shape" in r);
        assert.equal(typeof r.shape, "string");
    });
    it("createMaterialは、EとGを持つオブジェクト", function() {
        const r = createMaterial();
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["E", "G"]);
        assert.equal(typeof r.E, "number");
        assert.equal(typeof r.G, "number");
    })
    it("createLineは、n1, n2, section, materialを持つオブジェクト", function() {
        const nodes = {}, sections = {}, materials = {};
        for (let i = getRandomInt(10, 30); 0 < i; --i) {
            nodes[uuid()] = createNode(200);
            sections[uuid()] = createSection();
            materials[uuid()] = createMaterial();
        }
        const r = createLine(nodes, sections, materials);
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["n1", "n2", "section", "material"]);
        assert(r.n1 in nodes);
        assert(r.n2 in nodes);
        assert(r.section in sections);
        assert(r.material in materials);
    });
    it("createBoundaryは、node, x, y, z, rx, ry, rzを持つオブジェクト", function() {
        const nodes = {};
        for (let i = getRandomInt(10, 30); 0 < i; --i) {
            nodes[uuid()] = createNode(200);
        }
        const r = createBoundary(nodes);
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["node", "x", "y", "z", "rx", "ry", "rz"]);
        assert(r.node in nodes);
        assert(typeof r.x === "number" || typeof r.x === "boolean");
        assert(typeof r.y === "number" || typeof r.y === "boolean");
        assert(typeof r.z === "number" || typeof r.z === "boolean");
        assert(typeof r.rx === "number" || typeof r.rx === "boolean");
        assert(typeof r.ry === "number" || typeof r.ry === "boolean");
        assert(typeof r.rz === "number" || typeof r.rz === "boolean");
    });
    it("createNodeloadは、node, x, y, z, rx, ry, rzを持つオブジェクト", function() {
        const nodes = {};
        for (let i = getRandomInt(10, 30); 0 < i; --i) {
            nodes[uuid()] = createNode(200);
        }
        const r = createNodeload(nodes);
        assert.equal(typeof r, "object");
        assert.deepEqual(Object.keys(r), ["node", "x", "y", "z", "rx", "ry", "rz"]);
        assert(r.node in nodes);
        assert.equal(typeof r.x, "number");
        assert.equal(typeof r.y, "number");
        assert.equal(typeof r.z, "number");
        assert.equal(typeof r.rx, "number");
        assert.equal(typeof r.ry, "number");
        assert.equal(typeof r.rz, "number");
    });
    it("createMembersを、filterとargsなしで呼び出す", function() {
        let i = 0;
        function factory() {
            return {count: i++};
        }
        const r = createMembers(1, 200, null, factory);
        assert.equal(typeof r, "object");
        assert.equal(i, Object.keys(r).length);
    });
});
