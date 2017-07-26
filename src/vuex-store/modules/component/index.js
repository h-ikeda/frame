import drawer from "./drawer";
import datatable from "./datatable";
import canvas from "./canvas";
import dialog from "./dialog";

export default {
    namespaced: true,
    state() {
        return {
            splitGrids: 6
        };
    },
    mutations: {
        setSplitGrids(state, grids) {
            if (process.env.NODE_ENV !== "production") {
                if (grids < 1 || grids > 11) {
                    throw "Grid size must be between 1 to 11.";
                }
                if (grids !== Math.floor(grids)) {
                    throw "Grid size must be an integer, not a real.";
                }
            }
            state.splitGrids = grids;
        }
    },
    modules: {
        drawer,
        datatable,
        canvas,
        dialog
    }
};
