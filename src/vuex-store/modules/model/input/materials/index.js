import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "polymer"
        };
    },
    getters: {
        name: () => "Materials"
    }
});
