import {WebGLRenderer} from "three";

export default {
    props: [
        // rendererに渡すオプション
        "precision",
        "alpha",
        "premultipliedAlpha",
        "antialias",
        "stencil",
        "preserveDrawingBuffer",
        "depth",
        "logarithmicDepthBuffer"
    ],
    computed: {
        renderer() {
            const options = {canvas: this.$el};
            Object.keys(this.$props).forEach((prop) => {
                if (typeof prop !== "undefined") {
                    options[prop] = this[prop];
                }
            });
            return new WebGLRenderer(options);
        }
    },
    beforeCreate() {
        //
        // THREE.jsオブジェクトの受け渡しとレンダリング。
        // これらの変数は監視される必要はありませんが、インスタンス毎に保持したいので、
        // カスタムイベントにより実行する仕組みになっています。
        // このコンポーネント内からはthis.$emit("イベント名", 渡すもの)で、
        // 子コンポーネントからはthis.$parent.$emit("イベント名", 渡すもの)で呼び出します。
        //
        let scene, camera;
        
        // 子コンポーネントからオブジェクトを受け取って代入します。
        // THREE.Cameraのサブクラスであればobj.isCamera === trueです。
        this.$on("add", (obj) => {
            if (obj.isCamera) {
                camera = obj;
            } else {
                scene = obj;
            }
        });

        // canvas要素へのレンダリングを実行します。
        this.$on("render", () => {
            this.renderer.render(scene, camera);
        });
        
        // canvasのサイズが変更された時に呼び出します。
        this.$on("resize", () => {
            this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
            camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
            camera.updateProjectionMatrix();
        });
    },
    mounted() {
        this.$emit("resize");
        this.$emit("render");
    },
    updated() {
        this.$emit("render");
    },
    render(h) {
        return h("canvas", this.$slots.default);
    }
};
