import {state, getters, mutations, actions} from "../base";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Boundaries",
            icon: "change_history"
        };
    },
    getters: {
        ...getters
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
