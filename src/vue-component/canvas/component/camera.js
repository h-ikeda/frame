import object3d from "./object3d";
import {PerspectiveCamera, Vector3} from "three";

function setPosition(camera, {x, y, z}) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
}

function lookAt(camera, {x, y, z}) {
    camera.lookAt(new Vector3(x, y, z));
}

export default {
    mixins: [object3d],
    props: ["position", "lookAt"],
    methods: {
        createInstance: () => new PerspectiveCamera()
    },
    watch: {
        position(p) {
            this.$emit("setPosition", p);
        },
        lookAt(a) {
            this.$emit("lookAt", a);
        }
    },
    beforeCreate() {
        this.$on("setPosition", (p) => {
            this.$emit("handleObject", (camera) => {
                setPosition(camera, p);
            });
        });
        this.$on("lookAt", (a) => {
            this.$emit("handleObject", (camera) => {
                lookAt(camera, a);
            })
        });
    },
    created() {
        this.$emit("setPosition", this.position);
        this.$emit("lookAt", this.lookAt);
    }
};
