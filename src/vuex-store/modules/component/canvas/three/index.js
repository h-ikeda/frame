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
                y: 0,
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
        offset(state, offset) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof offset !== "object") {
                    throw "Argument offset should be an object.";
                }
            }
            if (offset.x) state.position.x += offset.x;
            if (offset.y) state.position.y += offset.y;
            if (offset.z) state.position.z += offset.z;
        },
        rotate(state, euler) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof euler !== "object") {
                    throw "Argument euler should be an object.";
                }
            }
            if (euler.x) state.rotation.x += euler.x;
            if (euler.y) state.rotation.y += euler.y;
            if (euler.z) state.rotation.z += euler.z;
        },
        zoom(state, zoom) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof zoom !== "number") {
                    throw "Argument zoom should be a number.";
                }
            }
            state.scale *= zoom;
        },
        offsetCamera(state, offset) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof offset !== "object") {
                    throw "Argument offset should be an object.";
                }
            }
            if (offset.x) state.cameraPosition.x += offset.x;
            if (offset.y) state.cameraPosition.y += offset.y;
            if (offset.z) state.cameraPosition.z += offset.z;
        },
        rotateCamera(state, euler) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof euler !== "object") {
                    throw "Argument euler should be an object.";
                }
            }
            if (euler.x) state.cameraRotation.x += euler.x;
            if (euler.y) state.cameraRotation.y += euler.y;
            if (euler.z) state.cameraRotation.z += euler.z;
        },
        setPosition(state, position) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof position !== "object") {
                    throw "Argument position should be an object.";
                }
            }
            if (position.x) state.position.x = position.x;
            if (position.y) state.position.y = position.y;
            if (position.z) state.position.z = position.z;
        },
        setRotation(state, rotation) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof rotation !== "object") {
                    throw "Argument rotation should be an object.";
                }
            }
            if (rotation.x) state.rotation.x = rotation.x;
            if (rotation.y) state.rotation.y = rotation.y;
            if (rotation.z) state.rotation.z = rotation.z;
        },
        setScale(state, scale) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof scale !== "number") {
                    throw "Argument scale should be a number.";
                }
            }
            state.scale = scale;
        },
        setCameraRotation(state, rotation) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof rotation !== "object") {
                    throw "Argument rotation should be an object.";
                }
            }
            if (rotation.x) state.cameraRotation.x = rotation.x;
            if (rotation.y) state.cameraRotation.y = rotation.y;
            if (rotation.z) state.cameraRotation.z = rotation.z;
            if (rotation.order) state.cameraRotation.order = rotation.order;
        },
        setCameraPosition(state, position) {
            if (process.env.NODE_ENV !== "production") {
                if (typeof position !== "object") {
                    throw "Argument position should be an object.";
                }
            }
            if (position.x) state.cameraPosition.x = position.x;
            if (position.y) state.cameraPosition.y = position.y;
            if (position.z) state.cameraPosition.z = position.z;
        }
    }
};
