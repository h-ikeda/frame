import {Object3D, Vector3, Euler} from "three";
import three from "./three";

function findParent(vm) {
    if (vm.$parent) {
        if (vm.$parent.$options.object3d) {
            return vm.$parent;
        }
        return findParent(vm.$parent);
    }
    return null;
}

export default {
    mixins: [three],
    object3d: true,
    props: [
        "position",
        "rotation",
        "scale",
        "name"
    ],
    computed: {
        instance: () => new Object3D(),
        parsedPosition() {
            const pos = this.position;
            if (!pos) {
                return new Vector3();
            }
            if (Array.isArray(pos)) {
                return new Vector3(...pos.map((item) => parseFloat(item)));
            }
            if (typeof pos === "object") {
                return new Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z));
            }
            return new Vector3(...pos.trim().split(/\s+/).map((item) => parseFloat(item)));
        },
        parsedRotation() {
            const rot = this.rotation;
            if (!rot) {
                return new Euler();
            }
            if (Array.isArray(rot)) {
                const xyz = rot.slice(0, 3).map((item) => parseFloat(item));
                xyz.length = 3;
                const order = Euler.RotationOrders.indexOf((rot[3] + "").trim()) < 0 ? "XYZ": rot[3].trim();
                return new Euler(...xyz, order);
            }
            if (typeof rot === "object") {
                const order = Euler.RotationOrders.indexOf((rot.order + "").trim()) < 0 ? "XYZ": rot.order.trim();
                return new Euler(parseFloat(rot.x), parseFloat(rot.y), parseFloat(rot.z), order);
            }
            const xyzo = (rot + "").trim().split(/\s+/);
            const xyz = xyzo.slice(0, 3).map((item) => parseFloat(item));
            xyz.length = 3;
            const order = Euler.RotationOrders.indexOf(xyzo[3]) < 0 ? "XYZ": xyzo[3];
            return new Euler(...xyz, order);
        },
        parsedScale() {
            const s = this.scale;
            if (!s) {
                return new Vector3(1, 1, 1);
            }
            if (Array.isArray(s)) {
                if (!s.length) {
                    return new Vector3(1, 1, 1);
                }
                if (s.length < 2) {
                    const t = parseFloat(s[0]) || 1;
                    return new Vector3(t, t, t);
                }
                const arr = s.length < 3 ? [...s, 1]: s;
                return new Vector3(...arr.map((item) => parseFloat(item) || 1));
            }
            if (typeof s === "object") {
                return new Vector3(parseFloat(s.x) || 1, parseFloat(s.y) || 1, parseFloat(s.z) || 1);
            }
            const arr = (s + "").trim().split(/\s+/);
            if (arr.length < 2) {
                const t = parseFloat(arr[0]) || 1;
                return new Vector3(t, t, t);
            }
            if (arr.length < 3) {
                arr.push(1);
            }
            return new Vector3(...arr.map((item) => parseFloat(item) || 1));
        }
    },
    created() {
        this.instance.position.copy(this.parsedPosition);
        this.instance.rotation.copy(this.parsedRotation);
        this.instance.scale.copy(this.parsedScale);
        const parent = findParent(this);
        if (parent) {
            parent.instance.add(this.instance);
            this.$emit("update");
        }
    },
    beforeDestroy() {
        if (this.instance.parent) {
            this.instance.parent.remove(this.instance);
            this.$emit("update");
        }
    },
    watch: {
        parsedPosition(position) {
            this.instance.position.copy(position);
            this.$emit("update");
        },
        parsedRotation(rotation) {
            this.instance.rotation.copy(rotation);
            this.$emit("update");
        },
        parsedScale(scale) {
            this.instance.scale.copy(scale);
            this.$emit("update");
        },
        instance(instance, oldInstance) {
            instance.add(...oldInstance.children);
            instance.position.copy(this.parsedPosition);
            instance.rotation.copy(this.parsedRotation);
            instance.scale.copy(this.parsedScale);
            const parent = oldInstance.parent;
            if (parent) {
                parent.remove(oldInstance);
                parent.add(instance);
                this.$emit("update");
            }
        }
    }
};
