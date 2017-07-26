import Vue from "vue";
import Vuex from "vuex";
import vueComponent from "./vue-component/index.vue";
import vuexStore from "./vuex-store";

Vue.use(Vuex);

new Vue({
    el: "#frame-root",
    store: new Vuex.Store(vuexStore),
    render: (h) => h(vueComponent)
});
