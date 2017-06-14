import {Object3D} from "three";

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

        // コールバック関数でTHREE.Object3Dインスタンスにアクセスできるようにします。
        this.$on("handleObject", (fn) => {
            fn(this.instance);
        });

        // THREE.Object3Dインスタンスのプロパティをセットします。
        // keyを配列で渡すと、ネストしたプロパティを設定できます。
        this.$on("setProperty", (key, value) => {
            setNestedProperty(this.instance, key, value);
        });

        // 子コンポーネントから渡されたオブジェクトをaddします。
        this.$on("add", (obj) => {
            this.instance.add(obj);
        });

        // 子コンポーネントから指定されたオブジェクトをremoveします。
        this.$on("remove", (obj) => {
            this.instance.remove(obj);
        });

        // THREE.Object3Dインスタンスを代入し、親コンポーネントに渡します。
        // インスタンス生成を、methodsに定義したcreateInstance()関数で行うことで、mixinに対応しています。
        this.$on("createObject", () => {

            // プロパティが宣言されていたら、設定します。
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

            // 親コンポーネントにオブジェクトを登録します。
            this.$parent.$emit("add", this.instance);
        });

        // 親コンポーネントにaddしたTHREE.Object3Dインスタンスをremoveします。
        this.$on("destroyObject", () => {
            this.$parent.$emit("remove", this.instance);
        });
    },
    created() {
        this.$emit("createObject");
    },
    destroyed() {
        this.$emit("destroyObject");
    },
    watch: {
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
