const struct = [{
    name: "displacements"
}, {
    name: "reactions"
}, {
    name: "stresses"
}];

export default {
    namespaced: true,
    state() {
        const t = {};
        struct.forEach((item) => {
            t[item.name] = {};
        })
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
