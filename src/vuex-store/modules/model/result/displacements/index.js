import Base from "../../base";

export default new Base({
    getters: {
        name: () => "Displacements",
        icon: () => "control_point_duplicate",
        max(state) {
            const t = {};
            ["x", "y", "z", "rx", "ry", "rz"].forEach((coodinate) => {
                t[coodinate] = Math.max(...Object.keys(state.data).map((key) => state.data[key][coodinate]));
            });
            return t;
        }
    }
});
