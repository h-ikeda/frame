import assert from "assert";
import Vue from "vue";
import store from "../store";
import app from "../app.vue";

describe("アプリの読み込みと表示", function() {
    it("rootエレメントはmdc-typographyクラスを含む", function () {
        const c = Vue.extend(app);
        const vm = new c({store}).$mount();
        assert(vm);
        assert(vm.$el.className.match(/mdc-typography/));
    });
});
