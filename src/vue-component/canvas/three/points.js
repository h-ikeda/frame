import object3d from "./object3d";
import {Points} from "three";

export default {
    mixins: [object3d],
    props: ["geometry", "material"],
    computed: {
        instance: () => new Points()
    },
    created() {
        if (this.material in this.materials) {
            this.instance.material = this.materials[this.material];
        }
        if (this.geometry in this.geometries) {
            this.instance.geometry = this.geometries[this.geometry];
        }
    },
    watch: {
        material(material) {
            this.instance.material = this.materials[material];
        },
        geometry(geometry) {
            this.instance.geometry = this.geometries[geometry];
        }
    }
};
