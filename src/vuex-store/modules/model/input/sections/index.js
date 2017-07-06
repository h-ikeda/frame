import {state, getters, mutations, actions} from "../base";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Sections",
            icon: "crop_square"
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
