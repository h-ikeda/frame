<template>
    <canvas ref="rdr" :key="key">
        <slot />
    </canvas>
</template>

<script>
    import {WebGLRenderer} from "three";
            import {Vector3, PerspectiveCamera} from "three";
    import three from "./three";
    import uuid from "uuid/v4";
    export default {
        mixins: [three],
        props: [
            "precision",
            "alpha",
            "premultipliedAlpha",
            "antialias",
            "stencil",
            "preserveDrawingBuffer",
            "depth",
            "logarithmicDepthBuffer",
            "width",
            "height"
        ],
        computed: {
            options() {
                return {
                    precision: this.precision,
                    alpha: this.alpha,
                    premultipliedAlpha: this.premultipliedAlpha === undefined || this.premultipliedAlpha,
                    antialias: this.antialias,
                    stencil: this.stencil === undefined || this.stencil,
                    preserveDrawingBuffer: this.preserveDrawingBuffer,
                    depth: this.depth === undefined || this.depth,
                    logarithmicDepthBuffer: this.logarithmicDepthBuffer
                };
            },
            rdr() {
                return new WebGLRenderer({
                    canvas: this.$el,
                    ...this.options
                });
            },
            //
            // canvas要素を既存DOMと置き換えるために、オプション更新毎にユニークなkeyを設定します。
            //
            key() {
                return this.options && uuid();
            }
        },
        beforeCreate() {
            //
            // カメラはCamera、それ以外はSceneとして登録します。
            //
            let camera = new PerspectiveCamera(), scene;
            camera.position.z = -20;
            camera.position.x = -20;
            camera.lookAt(new Vector3(0, 0, 0));
            this.$on("add", (obj) => {
                if (obj.isCamera) {
                    //camera = obj;
                } else {
                    scene = obj;
                }
            });
            //
            // レンダリングをトリガー
            //
            this.$on("render", () => {
                this.rdr.render(scene, camera);
            });
            //
            // サイズ変更のハンドリング
            //
            this.$on("resize", () => {
                this.rdr.setSize(this.width, this.height, false);
                camera.aspect = this.width / this.height;
                camera.updateProjectionMatrix();
            });
        },
        watch: {
            width() {
                this.$emit("resize");
            },
            height() {
                this.$emit("resize");
            }
        },
        updated() {
            this.$emit("render");
        }
    };
</script>
