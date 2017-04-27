export function setDrawerMenuOpen(state, open) {
    state.drawerMenuOpen = open;
};

export function setDialogOpen(state, open) {
    state.dialogOpen = open;
};

export function setDialogMode(state, mode) {
    state.dialogMode = mode;
};

export function setSplitVertical(state, vertical) {
    state.splitVertical = vertical;
};

export function setSplitPosition(state, pos) {
    state.splitPosition = pos;
};

export function selectRecord(state, index) {
    if (state.selectedRecords.indexOf(index) < 0) {
        state.selectedRecords.push(index);
    }
};

export function unselectRecord(state, index) {
    const i = state.selectedRecords.indexOf(index);
    if (i >= 0) {
        state.selectedRecords.splice(i, 1);
    }
};

export function setWaitingState(state, waiting) {
    state.waiting = waiting;
};