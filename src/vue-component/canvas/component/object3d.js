import {Object3D, Vector3} from "three";

// 変数がundefinedならfalse, それ以外はtrue。
function isDef(variable) {
    return typeof variable !== "undefined";
}

// obj.keyにvalueを設定します。
// keyが配列のときは、ネストされたプロパティを設定します。
function setNestedProperty(obj, key, value) {
    if (Array.isArray(key)) {
        let target = obj, last = key.length - 1;
        for (let i = 0; i < last; ++i) {
            target = target[key[i]];
        }
        target[key[last]] = value;
    } else {
        obj[key] = value;
    }
}

// valueがundefinedでなければ、obj.keyに代入します。
function setIfDef(obj, key, value) {
    if (isDef(value)) {
        setNestedProperty(obj, key, value);
    }
}

export default {
    props: [
        "lookAtX",
        "lookAtY",
        "lookAtZ",
        "positionX",
        "positionY",
        "positionZ",
        "rotationX",
        "rotationY",
        "rotationZ",
        "rotationOrder",
        "scaleX",
        "scaleY",
        "scaleZ"
    ],
    computed: {
        instance() {
            return new Object3D();
        }
    },
    beforeCreate() {
        // 子コンポーネントから渡されたオブジェクトをaddします。
        this.$on("add", (child) => {
            this.instance.add(child);
        });
        // 子コンポーネントから指定されたオブジェクトをremoveします。
        this.$on("remove", (child) => {
            this.instance.remove(child);
        });
    },
    created() {
        setIfDef(this.instance, ["position", "x"], this.positionX);
        setIfDef(this.instance, ["position", "y"], this.positionY);
        setIfDef(this.instance, ["position", "z"], this.positionZ);
        setIfDef(this.instance, ["rotation", "x"], this.rotationX);
        setIfDef(this.instance, ["rotation", "y"], this.rotationY);
        setIfDef(this.instance, ["rotation", "z"], this.rotationZ);
        setIfDef(this.instance, ["rotation", "order"], this.rotationOrder);
        setIfDef(this.instance, ["scale", "x"], this.scaleX);
        setIfDef(this.instance, ["scale", "y"], this.scaleY);
        setIfDef(this.instance, ["scale", "z"], this.scaleZ);
        this.instance.lookAt(new Vector3(this.lookAtX, this.lookAtY, this.lookAtZ));
        this.$parent.$emit("add", this.instance);
    },
    destroyed() {
        this.$parent.$emit("remove", this.instance);
    },
    watch: {
        lookAtX(x) {
            this.instance.lookAt(new Vector3(x, this.lookAtY, this.lookAtZ));
        },
        lookAtY(y) {
            this.instance.lookAt(new Vector3(this.lookAtX, y, this.lookAtZ));
        },
        lookAtZ(z) {
            this.instance.lookAt(new Vector3(this.lookAtX, this.lookAtY, z));
        },
        positionX(x) {
            this.instance.position.x = x;
        },
        positionY(y) {
            this.instance.position.y = y;
        },
        positionZ(z) {
            this.instance.position.z = z;
        },
        rotationX(x) {
            this.instance.rotation.x = x;
        },
        rotationY(y) {
            this.instance.rotation.y = y;
        },
        rotationZ(z) {
            this.instance.rotation.z = z;
        },
        rotationOrder(order) {
            this.instance.rotation.order = order;
        },
        scaleX(x) {
            this.instance.scale.x = x;
        },
        scaleY(y) {
            this.instance.scale.y = y;
        },
        scaleZ(z) {
            this.instance.scale.z = z;
        }
    },
    render(h) {
        return h("i", this.$slots.default);
    }
};
