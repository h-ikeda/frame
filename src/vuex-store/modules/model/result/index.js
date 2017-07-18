import {state, getters, mutations, actions} from "../base-intermediate";

import displacements from "./displacements";
import reactions from "./reactions";
import stresses from "./stresses";

const modules = [
    "displacements",
    "reactions",
    "stresses"
];

export default {
    namespaced: true,
    state() {
        return {
            ...state
        };
    },
    getters: {
        ...getters,
        modules: () => modules,
        name: () => "Result"
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    },
    modules: {
        displacements,
        reactions,
        stresses
    }
};
