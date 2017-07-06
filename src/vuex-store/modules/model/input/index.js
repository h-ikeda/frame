import nodes from "./nodes";
import lines from "./lines";
import sections from "./sections";
import materials from "./materials";
import boundaries from "./boundaries";
import nodeloads from "./nodeloads";

export default {
    namespaced: true,
    state() {
        return {
            caption: "Input"
        };
    },
    getters: {
        data(state, getters) {
            const t = {};
            [
                "nodes",
                "lines",
                "sections",
                "materials",
                "boundaries",
                "nodeloads"
            ]
            .forEach((module) => {
                t[module] = getters[module + "/data"];
            });
            return t;
        }
    },
    actions: {
        setData({dispatch}, {data, order}) {
            [
                "nodes",
                "lines",
                "sections",
                "materials",
                "boundaries",
                "nodeloads"
            ]
            .forEach((module) => {
                dispatch(module + "/setData", {
                    data: data[module],
                    order: order[module]
                });
            });
        }
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
