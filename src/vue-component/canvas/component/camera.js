import object3d from "./object3d";
import {PerspectiveCamera, Vector3} from "three";

function lookAt(camera, {x, y, z}) {
    camera.lookAt(new Vector3(x, y, z));
}

export default {
    mixins: [object3d],
    props: ["lookAt"],
    computed: {
        instance() {
            return new PerspectiveCamera();
        }
    },
    watch: {
        lookAt(a) {
            this.$emit("lookAt", a);
        }
    },
    beforeCreate() {
        this.$on("lookAt", (a) => {
            this.$emit("handleObject", (camera) => {
                lookAt(camera, a);
            })
        });
    },
    created() {
        this.$emit("lookAt", this.lookAt);
    }
};
