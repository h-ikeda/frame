import assert from "assert";
import Base from "./base";

describe("modelモジュールのBaseクラスのテスト", function() {
    it("インスタンス化可能", function() {
        const base = new Base();
        assert(base instanceof Base);
    });
});
