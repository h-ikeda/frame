import Base from "../base";

import displacements from "./displacements";
import reactions from "./reactions";
import stresses from "./stresses";

const modules = {
    displacements,
    reactions,
    stresses
};

export default new Base({
    getters: {
        modules: () => Object.keys(modules),
        name: () => "Result"
    },
    modules
});
