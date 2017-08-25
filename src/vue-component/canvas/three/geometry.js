import {Geometry} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name"],
    computed: {
        instance: () => new Geometry()
    },
    created() {
        this.parent().$emit("define", this.name, this.instance);
    },
    beforeDestroy() {
        this.parent().$emit("undefine", this.name, this.instance);
    }
};
