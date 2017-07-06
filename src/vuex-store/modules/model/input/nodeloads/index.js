import {state, getters, mutations, actions} from "../base";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Node Loads",
            icon: "arrow_downward"
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
