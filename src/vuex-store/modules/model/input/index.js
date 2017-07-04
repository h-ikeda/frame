const struct = [{
    name: "nodes",
    display: "Nodes",
    icon: "control_point"
}, {
    name: "lines",
    display: "Lines",
    icon: "timeline"
}, {
    name: "sections",
    display: "Sections",
    icon: "crop_square"
}, {
    name: "materials",
    display: "Materials",
    icon: "polymer"
}, {
    name: "boundaries",
    display: "Boundaries",
    icon: "change_history"
}, {
    name: "nodeloads",
    display: "Node Loads",
    icon: "arrow_downward"
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
        displayName: (state) => (type) => struct.find((obj) => obj.name === type).display,
        displayIcon: (state) => (type) => struct.find((obj) => obj.name === type).icon,
        dataTypes: () => struct.map((obj) => obj.name)
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
