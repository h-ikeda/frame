export default {
    state: {
        drawerMenuOpen: false,
        dialogOpen: false,
        dialogMode: "",
        splitVertical: false,
        splitPosition: innerWidth * 0.5 + "px",
        selectedRecords: [],
        waiting: false
    },
    getters: {
        isSelectedRecord(state) {
            return index => state.selectedRecords.indexOf(index) >= 0;
        }
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
        setSplitPosition(state, pos) {
            state.splitPosition = pos;
        },
        selectRecord(state, index) {
            if (state.selectedRecords.indexOf(index) < 0) {
                state.selectedRecords.push(index);
            }
        },
        unselectRecord(state, index) {
            const i = state.selectedRecords.indexOf(index);
            if (i >= 0) {
                state.selectedRecords.splice(i, 1);
            }
        },
        setWaitingState(state, waiting) {
            state.waiting = waiting;
        }
    }
};
