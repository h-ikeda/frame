import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menuOpen: false
    },
    mutations: {
        changeMenuState(state, value) {
            state.menuOpen = value;
        }
    },
    actions: {
        openMenu(context) {
            context.commit("changeMenuState", true);
        },
        closeMenu(context) {
            context.commit("changeMenuState", false);
        }
    }
});