import Vue from "vue";

export default {
    state: {
        drawerOpen: false,
        dialogOpen: false,
        dialogMode: "",
        splitterVertical: false,
        splitterPosition: innerWidth * 0.5 + "px",
        datatableSelectedRecords: [],
        indicatorState: false
    },
    mutations: {
        setDrawerOpen(state, open) {
            state.drawerOpen = open;
        },
        setDialogOpen(state, open) {
            if (!state.dialogOpen !== !open) {
                state.dialogOpen = open;
            }
        },
        setDialogMode(state, mode) {
            state.dialogMode = mode;
        },
        setSplitterVertical(state, vertical) {
            state.splitterVertical = vertical;
        },
        setSplitterPosition(state, pos) {
            state.splitterPosition = pos;
        },
        setIndicatorState(state, percentage) {
            state.indicatorState = percentage;
        },
        datatableSelectRecord(state, index) {
            if (state.datatableSelectedRecords.indexOf(index) < 0) {
                state.datatableSelectedRecords.push(index);
            }
        },
        datatableUnselectRecord(state, index) {
            const i = state.datatableSelectedRecords.indexOf(index);
            if (i >= 0) {
                state.datatableSelectedRecords.splice(i, 1);
            }
        }
    }
};