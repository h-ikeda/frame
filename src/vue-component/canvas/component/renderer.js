import {WebGLRenderer} from "three";

// WebGLRendererに渡されるオプション。
const props = [
    "precision",
    "alpha",
    "premultipliedAlpha",
    "antialias",
    "stencil",
    "preserveDrawingBuffer",
    "depth",
    "logarithmicDepthBuffer"
];

export default {
    props,
    computed: {
        // プロパティが変更されると、WebGLRendererは再インスタンス化されます。
        // コンポーネントのマウント後(mountedフック以降)にcallできます。
        rdr() {
            const options = {canvas: this.$el};
            props.forEach((prop) => {
                if (typeof this[prop] !== "undefined") {
                    options[prop] = this[prop];
                }
            });
            return new WebGLRenderer(options);
        },
        // 算出プロパティはキャッシュされるので、依存するリアクティブな変数が無ければ1度しか評価されません。
        bus() {return {};}
    },
    methods: {
        // 描画を更新します。
        // コンポーネントのマウント後(mountedフック以降)にcallできます。
        render() {
            this.rdr.render(this.bus.scene, this.bus.camera);
        },
        // Canvas要素のStyledサイズをWebGLRendererのサイズにします。
        // コンポーネントのマウント後(mountedフック以降)にcallできます。
        resize() {
            this.rdr.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
            this.bus.camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
            this.bus.camera.updateProjectionMatrix();
        }
    },
    beforeCreate() {
        // カメラはCamera、それ以外はSceneとして登録します。
        this.$on("add", (obj) => {
            this.bus[obj.isCamera ? "camera": "scene"] = obj;
        });
    },
    mounted() {
        this.resize();
        this.render();
    },
    updated() {
        this.render();
    },
    render(h) {
        return h("canvas", this.$slots.default);
    }
};
