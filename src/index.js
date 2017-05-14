import Vue from "vue";
import Vuex from "vuex";
import vueComponent from "./vue-component/index.vue";
import vuexStore from "./vuex-store";

Vue.use(Vuex);

global.init = (dom) => {
    new Vue({
        el: dom,
        store: new Vuex.Store(vuexStore),
        render: h => h(vueComponent)
    });
};