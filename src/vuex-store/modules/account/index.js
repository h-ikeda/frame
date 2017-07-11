import defaultPhoto from "./avatar.png";

export default {
    namespaced: true,
    state() {
        return {
            username: "sample user",
            email: "sample@example.com",
            photo: defaultPhoto
        };
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setPhoto(state, url) {
            state.photo = url;
        }
    }
};
