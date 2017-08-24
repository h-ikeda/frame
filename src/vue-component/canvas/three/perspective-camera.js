import camera from "./camera";
import {PerspectiveCamera, Vector3, Euler} from "three";

export default {
    mixins: [camera],
    props: ["target", "direction", "zoom", "near", "far"],
    computed: {
        instance() {
            return new PerspectiveCamera();
        },
        _target() {
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
        },
        _direction() {
            const direction = this.direction;
            if (!direction) {
                return new Vector3(0, 0, 1);
            }
            if (Array.isArray(direction)) {
                return new Vector3(...direction);
            }
            if (typeof direction === "object") {
                return new Vector3(direction.x, direction.y, direction.z);
            }
            return new Vector3(...direction.split(" "));
        },
        _position() {
            return this._direction.clone().negate().add(this._target);
        },
        _rotation() {
            const direction = this._direction;
            const y = direction.clone().setY(0).angleTo(new Vector3(0, 0, 1));
            return new Euler(0, Math.PI, 0);
        }
    },
    created() {
        this.instance.zoom = this.zoom || 1;
        this.instance.near = this.near || .1;
        this.instance.far = this.far || 2000;
    },
    watch: {
        _rotation() {},
        zoom(zoom) {
            this.instance.zoom = zoom || 1;
        },
        near(near) {
            this.instance.near = near || .1;
        },
        far(far) {
            this.instance.far = far || 2000;
        }
    }
};
