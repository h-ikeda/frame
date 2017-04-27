import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
//import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        documentTitle: ""
    },
//    getters,
    mutations,
    actions,
    modules
});
