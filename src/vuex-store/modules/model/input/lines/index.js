import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "timeline"
        };
    },
    getters: {
        ...getters,
        name: () => "Lines"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
