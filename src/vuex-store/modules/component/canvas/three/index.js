import orbit from "./orbit";

export default {
    namespaced: true,
    state() {
        return {
            cameraMode: "perspective",
            antialias: true
        };
    },
    mutations: {
        setCameraMode(state, mode) {
            state.cameraMode = mode;
        },
        setAntialias(state, antialias) {
            state.antialias = antialias;
        }
    },
    modules: {
        orbit
    }
};
