import {state, getters, mutations, actions} from "../../base-end";

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Materials",
            icon: "polymer"
        };
    },
    getters: {
        ...getters,
        name: () => "Materials"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
};
