import nodes from "./nodes.vue";
import lines from "./lines.vue";
import sections from "./sections.vue";
import materials from "./materials.vue";
import boundaries from "./boundaries.vue";
import nodeloads from "./nodeloads.vue";

import prefixed from "prefix-keys";

export default prefixed("input/", {
    nodes,
    lines,
    sections,
    materials,
    boundaries,
    nodeloads
});
