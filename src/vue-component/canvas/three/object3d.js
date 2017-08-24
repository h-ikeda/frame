import {Object3D, Vector3, Euler} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: [
        "position",
        "rotation",
        "scale"
    ],
    computed: {
        instance: () => new Object3D(),
        _position() {
            const pos = this.position;
            if (!pos) {
                return new Vector3();
            }
            if (Array.isArray(pos)) {
                return new Vector3(...pos);
            }
            if (typeof pos === "object") {
                return new Vector3(pos.x, pos.y, pos.z);
            }
            return new Vector3(...pos.split(" "));
        },
        _rotation() {
            const rot = this.rotation;
            if (!rot) {
                return new Euler();
            }
            if (Array.isArray(rot)) {
                return new Euler(...rot);
            }
            if (typeof rot === "object") {
                return new Euler(rot.x, rot.y, rot.z, rot.order);
            }
            return new Euler(...rot.split(" "));
        },
        _scale() {
            const s = this.scale;
            if (!s) {
                return new Vector3(1, 1, 1);
            }
            if (Array.isArray(s)) {
                return new Vector3(...s);
            }
            if (typeof s === "object") {
                return new Vector3(s.x, s.y, s.z);
            }
            const arr = s.split(" ");
            if (arr.length < 2) {
                return new Vector3(s, s, s);
            }
            return new Vector3(...arr);
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
    beforeDestrot() {
        this.parent().$emit("remove", this.instance);
    },
    watch: {
        _position(pos) {
            this.instance.position.copy(pos);
        },
        _rotation(rot) {
            this.instance.rotation.copy(rot);
        },
        _scale(s) {
            this.instance.scale.copy(s);
        }
    },
    render(h) {
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
