import {BufferGeometry} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name", "attribute"],
    computed: {
        instance: () => new BufferGeometry()
    },
    created() {
        this.attribute.split(";").forEach((attr) => {
            const [name, attribute] = attr.split(":");
            this.instance.addAttribute(name.trim(), this.attributes[attribute.trim()]);
        });
        this.parent().$emit("define", this.name, this.instance);
    },
    beforeDestroy() {
        this.parent().$emit("undefine", this.name, this.instance);
    },
    render(h) {
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
