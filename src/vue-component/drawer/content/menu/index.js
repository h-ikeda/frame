import group from "./group.vue";
import item from "./item.vue";
import prefixed from "prefix-keys";

export default prefixed("menu-", {
    group,
    item
});
