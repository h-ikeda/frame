import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            icon: "crop_square"
        };
    },
    getters: {
        ...getters,
        name: () => "Sections"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
