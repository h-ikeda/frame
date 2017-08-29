import {Geometry} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name"],
    computed: {
        instance: () => new Geometry()
    },
    watch: {
        instance(instance) {
            this.parent.assets.geometries[this.name] = instance;
        }
    },
    created() {
        this.$set(this.parent.assets.geometries, this.name, this.instance);
    },
    beforeDestroy() {
        if (this.parent.assets.geometries[this.name] === this.instance) {
            this.$delete(this.parent.assets.geometries, this.name);
        }
    }
};
