export default {
    namespaced: true,
    state() {
        return {
            opened: false
        };
    },
    mutations: {
        setOpened(state, opened) {
            state.opened = opened;
        }
    },
    actions: {
        open({commit}) {
            commit("setOpened", true);
        },
        close({commit}) {
            commit("setOpened", false);
        },
        toggle({commit, state}) {
            commit("setOpened", !state.opened);
        }
    }
};
