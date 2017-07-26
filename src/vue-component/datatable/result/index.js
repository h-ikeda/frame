import displacements from "./displacements.vue";
import reactions from "./reactions.vue";
import stresses from "./stresses.vue";

import prefixed from "prefix-keys";

export default prefixed("result/", {
    displacements,
    reactions,
    stresses
});
