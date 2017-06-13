import modules from "./modules";
import sampleModelPlugin from "./plugins/sample-model";

export default {
    strict: process.env.NODE_ENV !== "production",
    modules,
    plugins: [sampleModelPlugin]
};
