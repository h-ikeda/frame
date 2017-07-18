import {state, getters, mutations, actions} from "../base-intermediate";

import nodes from "./nodes";
import lines from "./lines";
import sections from "./sections";
import materials from "./materials";
import boundaries from "./boundaries";
import nodeloads from "./nodeloads";

const modules = [
    "nodes",
    "lines",
    "sections",
    "materials",
    "boundaries",
    "nodeloads",
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
        name: () => "Input"
    },
    actions: {
        ...actions
    },
    modules: {
        nodes,
        lines,
        sections,
        materials,
        boundaries,
        nodeloads
    }
};
