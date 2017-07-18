import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "control_point"
        };
    },
    getters: {
        ...getters,
        name: () => "Nodes"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
