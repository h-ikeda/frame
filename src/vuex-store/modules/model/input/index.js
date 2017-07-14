import {state, getters, mutations, actions} from "../base-intermediate";

import nodes from "./nodes";
import lines from "./lines";
import sections from "./sections";
import materials from "./materials";
import boundaries from "./boundaries";
import nodeloads from "./nodeloads";

const modules = [{
    id: "nodes",
    module: nodes
}, {
    id: "lines",
    module: lines
}, {
    id: "sections",
    module: sections
}, {
    id: "materials",
    module: materials
}, {
    id: "boundaries",
    module: boundaries
}, {
    id: "nodeloads",
    module: nodeloads
}];

export default {
    namespaced: true,
    state() {
        return {
            ...state,
            caption: "Input"
        };
    },
    getters: {
        ...getters,
        modules: () => modules
    },
    actions: {
        ...actions
    },
    modules: modules.reduce((root, {id, module}) => {
        root[id] = module;
        return root;
    }, {})
};
