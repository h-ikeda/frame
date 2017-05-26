const vueComponent = global.requireSrc(__filename, "vue");
const vuexStore = global.requireSrc(__dirname + "/../vuex-store/index.js").default;
import Vue from "vue";
import Vuex from "vuex";
import assert from "assert";

describe("ルートコンポーネントのテスト", function() {
    it("Vuexのストアをインスタンス化できる", function() {
        const store = new Vuex.Store(vuexStore);
        assert(store instanceof Vuex.Store);
    });
    it("Vueのコンポーネントをインスタンス化できる", function() {
        const vm = new Vue(vueComponent);
        assert(vm instanceof Vue);
    });
    it("レンダリングの結果、ルートエレメントが置き換えられる", function() {
        const testElement = document.createElement("div");
        const testString = "This text should be replaced.";
        testElement.innerHTML = "<span>" + testString + "</span>";
        assert.equal(testElement.firstElementChild.innerHTML, testString);
        const Ctor = Vue.extend(vueComponent);
        const vm = new Ctor({store: new Vuex.Store(vuexStore)}).$mount(testElement.firstElementChild);
        assert.notEqual(testElement.firstElementChild.innerHTML, testString);
        assert.equal(testElement.firstElementChild.tagName, "DIV");
    });
});
