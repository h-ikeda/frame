export default {
    namespaced: true,
    state() {
        return {
            backgroundColor: "#9E9E9E",
            lines: {
                color: 0x00ff00
            },
            nodes: {
                color: 0xff0000,
                size: 0.5
            }
        };
    },
    mutations: {
        setBackgroundColor(state, color) {
            state.backgroundColor = color;
        }
    }
};
