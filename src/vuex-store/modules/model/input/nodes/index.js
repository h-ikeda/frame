import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "control_point"
        };
    },
    getters: {
        name: () => "Nodes"
    }
});
