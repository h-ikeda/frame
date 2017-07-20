import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "control_point_duplicate"
        };
    },
    getters: {
        name: () => "Displacements"
    }
});
