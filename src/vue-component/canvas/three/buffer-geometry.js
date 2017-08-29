import {BufferGeometry} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name", "attribute"],
    computed: {
        instance: () => new BufferGeometry()
    },
    watch: {
        instance(instance) {
            this.parent.assets.geometries[this.name] = instance;
        }
    },
    created() {
        if (this.attribute) {
            this.attribute.split(";").forEach((attr) => {
                const [name, attribute] = attr.split(":");
                this.instance.addAttribute(name.trim(), this.attributes[attribute.trim()]);
            });
        }
        this.$set(this.parent.assets.geometries, this.name, this.instance);
    },
    beforeDestroy() {
        if (this.parent.assets.geometries[this.name] === this.instance) {
            this.$delete(this.parent.assets.geometries, this.name);
        }
    }
};
