//
// プロトタイプチェーンを利用した名前空間を提供するミックスインコンポーネントです。
// このコンポーネントをmixinsに追加すると、this.assetsのプロパティとしてthree.jsのインスタンスにアクセスできます。
//
// 例えば下記のようなVueインスタンスを生成します。
//
// const vm = new Vue({
//    mixins: [three],
//    created() {
//        this.assets.materials.a = "material-a";
//    },
//    components: {
//        child: {
//            mixins: [three],
//            created() {
//                this.assets.materials.b = "material-b";
//            }
//        }
//    },
//    template: "<child ref="child" />"
// }).$mount();
//
// このとき、vm.$refs.child.assetsから a: "material-a", b: "material-b" の両データにアクセスできます。
// b はオブジェクト自身のキー、a はプロトタイプオブジェクトのキーとなります。
// 親コンポーネントの名前空間にキーを追加したい場合は、Object.getPrototypeOfメソッドでプロトタイプオブジェクトを取得します。
// 

function findParent(vm) {
    if (vm.$parent) {
        if (vm.$parent.$options.three) {
            return vm.$parent;
        }
        return findParent(vm.$parent);
    }
    return null;
}

export default {
    three: true,
    data() {
        const parent = findParent(this);
        return {
            assets: {
                materials: Object.create(parent && parent.assets.materials),
                geometries: Object.create(parent && parent.assets.geometries),
                attributes: Object.create(parent && parent.assets.attributes),
                cameras: Object.create(parent && parent.assets.cameras),
                scenes: Object.create(parent && parent.assets.scenes)
            }
        };
    },
    beforeCreate() {
        const parent = findParent(this);
        if (parent) {
            this.$on("update", () => {
                parent.$emit("update");
            });
        }
    },
    render(h) {
        if (process.env.NODE_ENV !== "production") {
            return h("div", {
                attrs: this.$props
            }, this.$slots.default);
        }
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
