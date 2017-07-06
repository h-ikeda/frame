export default {
    namespaced: true,
    state() {
        return {
            selected: ["input", "nodes"]
        };
    },
    mutations: {
        select(state, selected) {
            state.selected = selected;
        }
    }
};
