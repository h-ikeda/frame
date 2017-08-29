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
        this.$set(this.parent.assets.scenes, this.name, this.instance);
    },
    beforeDestroy() {
        if (this.parent.assets.scenes[this.name] === this.instance) {
            this.$delete(this.parent.assets.scenes, this.name);
        }
    },
    watch: {
        instance(instance) {
            this.$set(this.parent.assets.scenes, this.name, instance);
        }
    }
};
