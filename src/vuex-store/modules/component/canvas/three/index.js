export default {
    namespaced: true,
    state() {
        return {
            perspective: true,
            cameraPosition: {
                x: 0,
                y: -10,
                z: 0
            },
            cameraRotation: {
                x: Math.PI / 2,
                y: 0,
                z: 0
            },
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                z: 0
            },
            scale: 1,
            scaleMax: 10,
            scaleMin: 0.1
        };
    },
    mutations: {
        toggleCameraMode(state) {
            state.perspective = !state.perspective;
        },
        offsetPosition(state, offset) {
            Object.keys(offset).forEach((c) => {
                if (c in state.position) {
                    state.position[c] += offset[c];
                }
            });
        },
        offsetRotation(state, offset) {
            Object.keys(offset).forEach((c) => {
                if (c in state.rotation) {
                    state.rotation[c] += offset[c];
                }
            });
        },
        multiplyScale(state, scale) {
            state.scale *= scale;
        }
    }
};
