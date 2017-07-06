import {state, getters, mutations, actions} from "../base";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Lines",
            icon: "timeline"
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
