import Base from "../../base";

export default new Base({
    state() {
        return {
            icon: "timeline"
        };
    },
    getters: {
        name: () => "Lines"
    }
});
