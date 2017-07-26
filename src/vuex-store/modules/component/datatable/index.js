export default {
    namespaced: true,
    state() {
        return {
            selected: "model/input/nodes"
        };
    },
    mutations: {
        select(state, selected) {
            state.selected = selected;
        }
    }
};
