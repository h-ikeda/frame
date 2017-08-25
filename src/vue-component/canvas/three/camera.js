import object3d from "./object3d";
import {Camera, Vector3, Euler, Spherical} from "three";

export default {
    mixins: [object3d],
    props: ["target", "orbit"],
    computed: {
        instance: () => new Camera(),
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
            return new Vector3(...target.split(" ").map((el) => +el));
        },
        _orbit() {
            const orbit = this.orbit;
            if (!orbit) {
                return new Spherical();
            }
            if (Array.isArray(orbit)) {
                return new Spherical(...orbit);
            }
            if (typeof orbit === "object") {
                return new Spherical(orbit.radius, orbit.phi, orbit.theta);
            }
            const props = orbit.split(";");
            if (props.length === 1 && props[0].split(":").length === 1) {
                return new Spherical(...props[0].split(" "));
            }
            const args = props.reduce((obj, str) => {
                const [name, value] = str.split(":");
                obj[name] = value;
                return obj;
            }, {});
            return new Spherical(args.radius, args.phi, args.theta);
        },
        _position() {
            return new Vector3().setFromSpherical(this._orbit).add(this._target);
        },
        _rotation() {
            return new Euler(this._orbit.phi - Math.PI * .5, this._orbit.theta, 0, "YXZ");
        }
    },
    created() {
        this.parent().$emit("define", this.name, this.instance);
    },
    beforeDestroy() {
        this.parent().$emit("undefine", this.name, this.instance);
    }
};
