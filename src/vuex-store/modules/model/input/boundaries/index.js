import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "change_history"
        };
    },
    getters: {
        name: () => "Boundaries"
    }
});
