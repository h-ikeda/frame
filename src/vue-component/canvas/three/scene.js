import object3d from "./object3d";
import {Scene} from "three";

export default {
    mixins: [object3d],
    computed: {
        instance() {
            return new Scene();
        }
    },
    created() {
        this.$set(Object.getPrototypeOf(this.assets.scenes), this.name, this.instance);
    },
    beforeDestroy() {
        if (Object.getPrototypeOf(this.assets.scenes)[this.name] === this.instance) {
            this.$delete(Object.getPrototypeOf(this.assets.scenes), this.name);
        }
    },
    watch: {
        instance(instance) {
            Object.getPrototypeOf(this.assets.scenes)[this.name] = instance;
        }
    }
};
