import object3d from "./object3d";
import {PointsMaterial, Geometry, Points, Vector3} from "three";

export default {
    mixins: [object3d],
    props: ["x", "y", "z", "color", "size"],
    methods: {
        createInstance() {
            const material = new PointsMaterial();
            if (typeof this.color !== "undefined") {
                material.color.set(this.color);
            }
            if (typeof this.size !== "undefined") {
                material.size = this.size;
            }

            const geometry = new Geometry();
            geometry.vertices.push(new Vector3(this.x, this.y, this.z));

            return new Points(geometry, material);
        }
    }
};
