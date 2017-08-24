<template>
    <div>
        <canvas ref="rdr" :key="key">
            <slot />
        </canvas>
    </div>
</template>

<script>
    import {WebGLRenderer} from "three";
    import three from "./three";
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
            "camera",
            "scene"
        ],
        data() {
            return {
                key: 0
            };
        },
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
                    canvas: this.$refs.rdr,
                    ...this.options
                });
            },
            _camera() {
                const name = this.camera === undefined ? Object.keys(this.cameras)[0]: this.camera;
                return this.cameras[name];
            },
            _scene() {
                const name = this.scene === undefined ? Object.keys(this.scenes)[0]: this.scene;
                return this.scenes[name];
            }
        },
        methods: {
            render() {
                this.rdr.render(this._scene, this._camera);
            }
        },
        watch: {
            options() {
                ++this.key;
            },
            _scene(scene) {
                this.rdr.render(scene, this._camera);
            },
            _camera(camera) {
                this.rdr.render(this._scene, camera);
            }
        },
        beforeCreate() {
            this.$on("resize", () => {
                this.rdr.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
                this._camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
                this._camera.updateProjectionMatrix();
                this.render();
            });
        }
    };
</script>
