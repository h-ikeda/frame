import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "arrow_upward"
        };
    },
    getters: {
        name: () => "Reactions"
    }
});
