import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "arrow_upward"
        };
    },
    getters: {
        ...getters,
        name: () => "Reactions"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
