import orbit from "./orbit";

export default {
    namespaced: true,
    state() {
        return {
            cameraMode: "perspective"
        };
    },
    mutations: {
        setCameraMode(state, mode) {
            state.cameraMode = mode;
        }
    },
    modules: {
        orbit
    }
};
