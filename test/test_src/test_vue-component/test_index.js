const vueComponent = global.requireSrc(__filename, "vue");
const vuexStore = global.requireSrc(__dirname + "/../vuex-store/index.js").default;
import assert from "assert";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

describe("アプリの読み込みと表示", function() {
    it("rootエレメントはdiv", function () {
        const c = Vue.extend(vueComponent);
        const vm = new c({store: new Vuex.Store(vuexStore)}).$mount();
        assert.equal(vm.$el.tagName, "DIV");
    });
});
