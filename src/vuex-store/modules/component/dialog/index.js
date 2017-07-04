export default {
    namespaced: true,
    state() {
        return {
            mode: ""
        };
    },
    mutations: {
        setMode(state, mode) {
            state.mode = mode;
        }
    }
};
