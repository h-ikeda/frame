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
        "rotationX",
        "rotationY",
        "rotationZ",
        "rotationOrder",
        "scaleX",
        "scaleY",
        "scaleZ"
    ],
    methods: {
        // THREE.Object3Dのインスタンスを生成します。
        // mixinコンポーネントでは、createInstanceメソッドをオーバーライドすることで生成するインスタンスを変更できます。
        createInstance() {
            return new Object3D();
        }
    },
    beforeCreate() {
        //
        // THREE.Object3Dのインスタンスをコンポーネントのインスタンス毎に生成します。
        //
        let _obj;

        // コールバック関数でTHREE.Object3Dインスタンスにアクセスできるようにします。
        this.$on("handleObject", (fn) => {
            fn(_obj);
        });

        // THREE.Object3Dインスタンスのプロパティをセットします。
        // keyを配列で渡すと、ネストしたプロパティを設定できます。
        this.$on("setProperty", (key, value) => {
            setNestedProperty(_obj, key, value);
            this.$emit("update");
        });

        // 子コンポーネントから渡されたオブジェクトをaddします。
        this.$on("add", (obj) => {
            _obj.add(obj);
            this.$emit("update");
        });

        // 子コンポーネントから指定されたオブジェクトをremoveします。
        this.$on("remove", (obj) => {
            _obj.remove(obj);
        });

        // THREE.Object3Dインスタンスを代入し、親コンポーネントに渡します。
        // インスタンス生成を、methodsに定義したcreateInstance()関数で行うことで、mixinに対応しています。
        this.$on("createObject", () => {
            _obj = this.createInstance();

            // プロパティが宣言されていたら、設定します。
            setIfDef(_obj, ["rotation", "x"], this.rotationX);
            setIfDef(_obj, ["rotation", "y"], this.rotationY);
            setIfDef(_obj, ["rotation", "z"], this.rotationZ);
            setIfDef(_obj, ["rotation", "order"], this.rotationOrder);
            setIfDef(_obj, ["scale", "x"], this.scaleX);
            setIfDef(_obj, ["scale", "y"], this.scaleY);
            setIfDef(_obj, ["scale", "z"], this.scaleZ);

            // 親コンポーネントにオブジェクトを登録します。
            this.$parent.$emit("add", _obj);
        });

        // 親コンポーネントにaddしたTHREE.Object3Dインスタンスをremoveします。
        this.$on("destroyObject", () => {
            this.$parent.$emit("remove", _obj);
        });

        // 親コンポーネントにオブジェクトが変更されたことを知らせます。
        this.$on("update", () => {
            this.$parent.$emit("update");
        });
    },
    created() {
        this.$emit("createObject");
    },
    destroyed() {
        this.$emit("destroyObject");
    },
    watch: {
        rotationX(x) {
            this.$emit("setProperty", ["rotation", "x"], x);
        },
        rotationY(y) {
            this.$emit("setProperty", ["rotation", "y"], y);
        },
        rotationZ(z) {
            this.$emit("setProperty", ["rotation", "z"], z);
        },
        rotationOrder(order) {
            this.$emit("setProperty", ["rotation", "order"], order);
        },
        scaleX(x) {
            this.$emit("setProperty", ["scale", "x"], x);
        },
        scaleY(y) {
            this.$emit("setProperty", ["scale", "y"], y);
        },
        scaleZ(z) {
            this.$emit("setProperty", ["scale", "z"], z);
        }
    },
    render(h) {
        return h("i", this.$slots.default);
    }
};
