import defaultBgImg from "./background-default.png";

export default {
    namespaced: true,
    state() {
        return {
            open: false,
            bgImg: defaultBgImg
        };
    },
    mutations: {
        setOpen(state, open) {
            state.open = open;
        },
        setBackgroundImage(state, url) {
            state.bgImg = url;
        }
    },
    actions: {
        toggle({commit, state}, open) {
            if (typeof open === "undefined") {
                commit("setOpen", !state.open);
            } else {
                commit("setOpen", open);
            }
        }
    }
};
