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
        const idMap = {};
        const t = {idMap};
        struct.forEach((item) => {
            t[item.name] = {};
            idMap[item.name] = [];
        });
        return t;
    },
    getters: {
        indexOf: (state) => (type, id) => state.idMap[type].indexOf(id)
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
