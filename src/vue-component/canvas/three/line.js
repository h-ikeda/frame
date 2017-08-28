import object3d from "./object3d";
import {Line} from "three";

export default {
    mixins: [object3d],
    props: ["geometry", "material"],
    computed: {
        instance: () => new Line(),
        geometryInstance() {
            return this.geometries[this.geometry];
        },
        materialInstance() {
            return this.materials[this.material];
        }
    },
    created() {
        if (this.materialInstance) {
            this.instance.material = this.materialInstance;
        }
        if (this.geometryInstance) {
            this.instance.geometry = this.geometryInstance;
        }
    },
    watch: {
        materialInstance(material) {
            this.instance.material = material;
        },
        geometryInstance(geometry) {
            this.instance.geometry = geometry;
        }
    }
};
