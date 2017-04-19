export default {
    state: {
        drawerMenuOpen: false,
        dialogOpen: false,
        dialogMode: "",
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
        setWaitingState(state, waiting) {
            state.waiting = waiting;
        }
    }
};