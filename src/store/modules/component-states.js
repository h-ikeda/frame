export default {
    state: {
        drawerMenuOpen: false,
        dialogOpen: false,
        dialogMode: "",
        splitVertical: false,
        splitRatio: 0.5,
        waiting: false
    },
    mutations: {
        setDrawerMenuOpen(state, open) {
            state.drawerMenuOpen = open;
        },
        setDialogOpen(state, open) {
            state.dialogOpen = open;
        },
        setDialogMode(state, mode) {
            state.dialogMode = mode;
        },
        setSplitVertical(state, vertical) {
            state.splitVertical = vertical;
        },
        setSplitRatio(state, ratio) {
            state.splitRatio = ratio;
        },
        setWaitingState(state, waiting) {
            state.waiting = waiting;
        }
    }
};
