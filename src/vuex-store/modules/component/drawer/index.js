import defaultBgImg from "./background-default.png";

export default {
    namespaced: true,
    state() {
        return {
            open: false,
            expanded: {},
            bgImg: defaultBgImg
        };
    },
    mutations: {
        setOpen(state, open) {
            state.open = open;
        },
        expand(state, id) {
            if (id in state.expanded) {
                state.expanded[id] = true;
            } else {
                state.expanded = {
                    ...state.expanded,
                    [id]: true
                };
            }
        },
        collapse(state, id) {
            state.expanded[id] = false;
        },
        setBackgroundImage(state, url) {
            state.bgImg = url;
        }
    },
    actions: {
        toggleOpen({commit, state}, open) {
            if (typeof open === "undefined") {
                commit("setOpen", !state.open);
            } else {
                commit("setOpen", open);
            }
        },
        toggleExpanded({commit, state}, id) {
            commit(state.expanded[id] ? "collapse": "expand", id);
        }
    }
};
