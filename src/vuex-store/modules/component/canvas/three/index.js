import orbit from "./orbit";

export default {
    namespaced: true,
    state() {
        return {
            cameraMode: "perspective",
            acceralation: {
                pan: .1,
                rotation: .1,
                zoom: 0.001
            }
        };
    },
    mutations: {
        setCameraMode(state, mode) {
            state.cameraMode = mode;
        },
        setAcceralation(state, acceralation) {
            Object.keys(state.acceralation).forEach((key) => {
                state.acceralation[key] = acceralation[key];
            });
        }
    },
    modules: {
        orbit
    }
};
