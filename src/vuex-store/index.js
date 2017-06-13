import modules from "./modules";
import input from "../../test/model-sample";

export default {
    strict: process.env.NODE_ENV !== "production",
    modules,
    plugins: [(store) => {
        store.commit("model/input/setData", input);
    }]
};
