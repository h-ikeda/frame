const struct = [{
    name: "displacements",
    display: "Displacements",
    icon: "control_point_duplicate"
}, {
    name: "reactions",
    display: "Reactions",
    icon: "arrow_upward"
}, {
    name: "stresses",
    display: "Streses",
    icon: "open_with"
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
        displayName: (state) => (type) => struct.find((obj) => obj.name === type).display,
        displayIcon: (state) => (type) => struct.find((obj) => obj.name === type).icon,
        dataTypes: () => struct.map((obj) => obj.name)
    },
    mutations: {
        setData(state, data) {
            struct.forEach((item) => {
                state[item.name] = data[item.name];
            });
        }
    }
};
