import {BufferAttribute} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name", "array", "size"],
    computed: {
        instance: () => new BufferAttribute(new Float32Array(0), 3),
        typedArray() {
            return new Float32Array(typeof this.array === "object" ? this.array: this.array.split(" "));
        }
    },
    created() {
        this.instance.setArray(new Float32Array());
        this.instance.itemSize = this.size;
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
