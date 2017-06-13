const struct = [{
    name: "nodes"
}, {
    name: "lines"
}, {
    name: "sections"
}, {
    name: "materials"
}, {
    name: "boundaries"
}, {
    name: "nodeloads"
}];

export default {
    namespaced: true,
    state() {
        const t = {};
        struct.forEach((item) => {
            t[item.name] = {};
        });
        return t;
    },
    mutations: {
        setData(state, data) {
            struct.forEach((item) => {
                state[item.name] = data[item.name];
            });
        }
    }
};
