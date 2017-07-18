import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "change_history"
        };
    },
    getters: {
        ...getters,
        name: () => "Boundaries"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
