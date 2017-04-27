import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

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
    getters,
    mutations,
    actions
}