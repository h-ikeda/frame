import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "crop_square"
        };
    },
    getters: {
        name: () => "Sections"
    }
});
