export default {
    namespaced: true,
    state() {
        return {
            name: "input/nodes"
        };
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        }
    }
};
