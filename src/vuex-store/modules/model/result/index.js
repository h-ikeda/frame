import {state, getters, mutations, actions} from "../base-intermediate";

import displacements from "./displacements";
import reactions from "./reactions";
import stresses from "./stresses";

const modules = [{
    id: "displacements",
    module: displacements
}, {
    id: "reactions",
    module: reactions
}, {
    id: "stresses",
    module: stresses
}];

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Result"
        };
    },
    getters: {
        ...getters,
        modules: () => modules
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    },
    modules: modules.reduce((root, {id, module}) => {
        root[id] = module;
        return root;
    }, {})
};
