import {Material} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name"],
    computed: {
        instance: () => new Material()
    },
    watch: {
        instance(instance) {
            this.parent.assets.materials[this.name] = instance;
        }
    },
    created() {
        this.$set(this.parent.assets.materials, this.name, this.instance);
    },
    beforeDestroy() {
        if (this.parent.assets.materials[this.name] === this.instance) {
            this.$delete(this.parent.assets.materials, this.name);
        }
    }
};
