import Vue from "vue";
import Vuex from "vuex";
import MuseUI from "muse-ui";
import vueComponent from "./vue-component/index.vue";
import vuexStore from "./vuex-store";

Vue.use(Vuex);
Vue.use(MuseUI);

new Vue({
    el: "#frame-root",
    store: new Vuex.Store(vuexStore),
    render: (h) => h(vueComponent)
});
