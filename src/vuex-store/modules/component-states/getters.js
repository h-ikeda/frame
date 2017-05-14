export function isSelectedRecord(state) {
    return index => state.selectedRecords.indexOf(index) >= 0;
};