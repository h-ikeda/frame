import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "open_with"
        };
    },
    getters: {
        name: () => "Stresses"
    }
});
