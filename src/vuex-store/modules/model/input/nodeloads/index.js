import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "arrow_downward"
        };
    },
    getters: {
        ...getters,
        name: () => "Node Loads"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
