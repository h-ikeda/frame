const struct = [{
    name: "nodes",
    display: "Nodes"
}, {
    name: "lines",
    display: "Lines"
}, {
    name: "sections",
    display: "Sections"
}, {
    name: "materials",
    display: "Materials"
}, {
    name: "boundaries",
    display: "Boundaries"
}, {
    name: "nodeloads",
    display: "Node Loads"
}];

export default {
    namespaced: true,
    state() {
        const idMap = {};
        const t = {idMap};
        struct.forEach((item) => {
            t[item.name] = {};
            idMap[item.name] = [];
        });
        return t;
    },
    getters: {
        indexOf: (state) => (type, id) => state.idMap[type].indexOf(id),
        displayName: (state) => (type) => struct.find((obj) => obj.name === type).display
    },
    mutations: {
        setData(state, data) {
            struct.forEach((item) => {
                state[item.name] = data[item.name];
                state.idMap[item.name] = Object.keys(state[item.name]);
            });
        }
    }
};
