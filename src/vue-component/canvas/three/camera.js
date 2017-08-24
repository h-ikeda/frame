import object3d from "./object3d";
import {Camera} from "three";

export default {
    mixins: [object3d],
    computed: {
        instance: () => new Camera()
    },
    created() {
        this.parent().$emit("define", this.name, this.instance);
    },
    beforeDestroy() {
        this.parent().$emit("undefine", this.name, this.instance);
    }
}
