export default {
    namespaced: true,
    state() {
        return {
            username: "sample user",
            email: "sample@example.com"
        };
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setEmail(state, email) {
            state.email = email;
        }
    }
};
