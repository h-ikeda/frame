import assert from "assert";
const modules = global.requireSrc(__filename).default;

describe("Vuex moduleをまとめてexportするindex.js", function() {
    it("modulesはオブジェクト", function() {
        assert.equal(typeof modules, "object");
    });
    it("modulesの全てのメンバはオブジェクト", function() {
        Object.keys(modules).forEach((key) => {
            assert.equal(typeof modules[key], "object");
        });
    });
});
