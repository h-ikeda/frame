import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "arrow_downward"
        };
    },
    getters: {
        name: () => "Node Loads"
    }
});
