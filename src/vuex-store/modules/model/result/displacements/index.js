import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "control_point_duplicate"
        };
    },
    getters: {
        ...getters,
        name: () => "Displacements"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
