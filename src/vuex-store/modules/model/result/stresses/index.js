import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "open_with"
        };
    },
    getters: {
        ...getters,
        name: () => "Stresses"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
