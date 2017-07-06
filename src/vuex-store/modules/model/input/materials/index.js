import {state, getters, mutations, actions} from "../base";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Materials",
            icon: "polymer"
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
