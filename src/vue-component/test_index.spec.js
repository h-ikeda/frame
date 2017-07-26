import vueComponent from "./index.vue";
import Vue from "vue";
import assert from "assert";

describe("ルートコンポーネントのテスト", function() {
    it("Vueのコンポーネントをインスタンス化できる", function() {
        const vm = new Vue(vueComponent);
        assert(vm instanceof Vue);
    });
});
