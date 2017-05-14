const vueComponent = global.requireSrc(__filename, "vue");
const vuexStore = global.requireSrc(__dirname + "/../vuex-store/index.js").default;
import assert from "assert";
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

describe("アプリの読み込みと表示", function() {
    it("rootエレメントはframe-rootクラスを含む", function (done) {
        const c = Vue.extend(vueComponent);
        const vm = new c({store: new Vuex.Store(vuexStore)}).$mount();
        assert(vm.$el.className.match(/frame-root/));
        firebase.app(vm.$store.state.databaseConnection.appname).delete().then(done);
    });
});
