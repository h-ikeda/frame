import Base from "../base";

import nodes from "./nodes";
import lines from "./lines";
import sections from "./sections";
import materials from "./materials";
import boundaries from "./boundaries";
import nodeloads from "./nodeloads";

const modules = {
    nodes,
    lines,
    sections,
    materials,
    boundaries,
    nodeloads
};

export default new Base({
    getters: {
        name: () => "Input",
        modules: () => Object.keys(modules)
    },
    modules
});
