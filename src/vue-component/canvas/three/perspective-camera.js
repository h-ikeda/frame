import object3d from "./object3d";
import {PerspectiveCamera, Vector3} from "three";

export default {
    mixins: [object3d],
    props: ["target"],
    computed: {
        instance() {
            return new PerspectiveCamera();
        },
        targetVector() {
            const target = this.target;
            if (!target) {
                return new Vector3();
            }
            if (Array.isArray(target)) {
                return new Vector3(...target);
            }
            if (typeof target === "object") {
                return new Vector3(target.x, target.y, target.z);
            }
            return new Vector3(...target.split(" "));
        }
    },
    created() {
        this.instance.position.z = -10;
        this.instance.position.x = -10;
        this.instance.position.y = 1;
        this.instance.lookAt(this.targetVector);
    }
};
