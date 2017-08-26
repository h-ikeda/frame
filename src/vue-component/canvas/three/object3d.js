import {Object3D, Vector3, Euler} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: [
        "position",
        "rotation",
        "scale",
        "name"
    ],
    computed: {
        instance: () => new Object3D(),
        _position() {
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
        _rotation() {
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
            const xyzo = rot.trim().split(/\s+/);
            const xyz = xyzo.slice(0, 3).map((item) => parseFloat(item));
            xyz.length = 3;
            const order = Euler.RotationOrders.indexOf(xyzo[3]) < 0 ? "XYZ": xyzo[3];
            return new Euler(...xyz, order);
        },
        _scale() {
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
    beforeCreate() {
        // 子コンポーネントのオブジェクトを登録。
        this.$on("add", (child) => {
            this.instance.add(child);
        });
        // 子コンポーネントのオブジェクトを削除。
        this.$on("remove", (child) => {
            this.instance.remove(child);
        });
    },
    created() {
        this.instance.position.copy(this._position);
        this.instance.rotation.copy(this._rotation);
        this.instance.scale.copy(this._scale);
        this.parent().$emit("add", this.instance);
    },
    beforeDestroy() {
        this.parent().$emit("remove", this.instance);
    },
    watch: {
        instance(instance, oldInstance) {
            if (instance !== oldInstance) {
                this.parent().$emit("remove", oldInstance);
                this.parent().$emit("add", instance);
            }
        },
        _position(position) {
            this.instance.position.copy(position);
        },
        _rotation(rotation) {
            this.instance.rotation.copy(rotation);
        },
        _scale(scale) {
            this.instance.scale.copy(scale);
        }
    }
};
