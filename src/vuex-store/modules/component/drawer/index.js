export default {
    namespaced: true,
    state() {
        return {
            open: false
        };
    },
    mutations: {
        toggleOpen(state) {
            state.open = !state.open;
        }
    }
};
