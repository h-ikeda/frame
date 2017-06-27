const struct = [{
    name: "displacements",
    display: "Displacements"
}, {
    name: "reactions",
    display: "Reactions"
}, {
    name: "stresses",
    display: "Streses"
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
    getters: {
        displayName: (state) => (type) => struct.find((obj) => obj.name === type).display
    },
    mutations: {
        setData(state, data) {
            struct.forEach((item) => {
                state[item.name] = data[item.name];
            });
        }
    }
};
