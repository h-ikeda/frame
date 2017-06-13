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
    beforeCreate() {
        //
        // THREE.jsオブジェクトの受け渡しとレンダリング。
        // これらの変数は監視される必要はありませんが、インスタンス毎に保持したいので、
        // カスタムイベントにより実行する仕組みになっています。
        // このコンポーネント内からはthis.$emit("イベント名", 渡すもの)で、
        // 子コンポーネントからはthis.$parent.$emit("イベント名", 渡すもの)で呼び出します。
        //
        let scene, camera, renderer;
        
        // 子コンポーネントからオブジェクトを受け取って代入します。
        // THREE.Cameraのサブクラスであればobj.isCamera === trueです。
        this.$on("add", (obj) => {
            if (obj.isCamera) {
                camera = obj;
            } else {
                scene = obj;
            }
        });

        // THREE.WebGLRendererをrendererに代入します。
        // 初期化時およびオプション変数を変更したときに呼び出します。
        this.$on("createRenderer", () => {
            const options = {
                canvas: this.$el
            };
            // コンポーネントに渡されたプロパティのうち、undefinedでないものをオプションに指定。
            Object.keys(this.$props).forEach((prop) => {
                if (typeof prop !== "undefined") {
                    options[prop] = this[prop];
                }
            });
            renderer = new WebGLRenderer(options);
        });

        // canvas要素へのレンダリングを実行します。
        this.$on("render", () => {
            if (renderer) {
                renderer.render(scene, camera);
            }
        });
        
        // canvasのサイズが変更された時に呼び出します。
        this.$on("resize", () => {
            renderer.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
            camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
            camera.updateProjectionMatrix();
        });
        
        // オブジェクトの内容が変更されたら、再レンダリングを予約します。
        this.$on("update", () => {
            this.$emit("render");
        });
    },
    mounted() {
        this.$emit("createRenderer");
        this.$emit("resize");
        this.$emit("render");
    },
    render(h) {
        return h("canvas", this.$slots.default);
    }
};
