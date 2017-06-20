import three from "./three";

export default {
    namespaced: true,
    state() {
        return {
            backgroundColor: "#9E9E9E",
            lineStyle: {
                color: 0x00ff00
            },
            nodeStyle: {
                color: 0xff0000,
                size: 0.5
            }
        };
    },
    mutations: {
        setBackgroundColor(state, color) {
            state.backgroundColor = color;
        },
        setLineStyle(state, style) {
            Object.keys(style).forEach((key) => {
                if (key in state.lineStyle) {
                    state.lineStyle[key] = style[key];
                }
            });
        },
        setNodeStyle(state, style) {
            Object.keys(style).forEach((key) => {
                if (key in state.nodeStyle) {
                    state.nodeStyle[key] = style[key];
                }
            });
        }
    },
    modules: {
        three
    }
};
