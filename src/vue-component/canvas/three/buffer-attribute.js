import {BufferAttribute} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name", "array", "size"],
    computed: {
        instance: () => new BufferAttribute(new Float32Array(0), 3)
    },
    created() {
        this.instance.setArray(new Float32Array(typeof this.array === "object" ? this.array: this.array.split(" ")));
        this.instance.itemSize = this.size || 3;
        this.instance.needsUpdate = true;
        this.parent().$emit("define", this.name, this.instance);
    },
    beforeDestroy() {
        this.parent().$emit("undefine", this.name, this.instance);
    },
    watch: {
        array(arr) {
            const _arr = typeof arr === "object" ? arr: arr.split(" ");
            if (_arr.length !== this.instance.array.length) {
                this.instance.setArray(new Float32Array(_arr));
            } else {
                this.instance.copyArray(_arr);
            }
        },
        size(size) {
            this.instance.itemSize = size || 3;
        }
    },
    render(h) {
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
