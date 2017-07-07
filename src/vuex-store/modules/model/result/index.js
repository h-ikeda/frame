import displacements from "./displacements";
import reactions from "./reactions";
import stresses from "./stresses";

const modules = {
    displacements,
    reactions,
    stresses
};

export default {
    namespaced: true,
    state() {
        return {
            caption: "Result"
        };
    },
    getters: {
        data(state, getters) {
            const t = {};
            Object.keys(modules).forEach((module) => {
                t[module] = getters[module + "/data"];
            });
            return t;
        }
    },
    actions: {
        setData({dispatch}, {data, order}) {
            Object.keys(modules).forEach((module) => {
                dispatch(module + "/setData", {
                    data: data[module],
                    order: order[module]
                });
            });
        }
    },
    modules
};
