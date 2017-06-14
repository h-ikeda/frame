import object3d from "./object3d";
import {LineBasicMaterial, Geometry, Line, Vector3} from "three";

export default {
    mixins: [object3d],
    props: ["x1", "y1", "z1", "x2", "y2", "z2", "color", "linewidth"],
    computed: {
        instance() {
            const material = new LineBasicMaterial();
            if (typeof this.color !== "undefined") {
                material.color.set(this.color);
            }

            const geometry = new Geometry();
            geometry.vertices.push(
                new Vector3(this.x1, this.y1, this.z1),
                new Vector3(this.x2, this.y2, this.z2)
            );

            return new Line(geometry, material);
        }
    }
};
