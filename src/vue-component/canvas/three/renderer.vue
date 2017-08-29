<template>
    <div>
        <canvas ref="renderer" :key="key">
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
            instance() {
                return new WebGLRenderer({
                    canvas: this.$refs.renderer,
                    ...this.options
                });
            },
            cameraInstance() {
                const cameraNames = Object.keys(this.cameras);
                if (cameraNames.length) {
                    return this.cameras[this.camera === undefined ? cameraNames[0]: this.camera];
                }
            },
            sceneInstance() {
                const sceneNames = Object.keys(this.scenes);
                if (sceneNames.length) {
                    return this.scenes[this.scene === undefined ? sceneNames[0]: this.scene];
                }
            }
        },
        methods: {
            resize() {
                this.instance.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
                this.cameraInstance.aspect = this.$el.clientWidth / this.$el.clientHeight;
                this.cameraInstance.updateProjectionMatrix();
                this.$emit("update");
            }
        },
        watch: {
            options() {
                ++this.key;
                this.$nextTick(() => {
                    this.resize();
                });
            },
            scene() {
                this.$emit("update");
            },
            camera() {
                this.cameraInstance.aspect = this.$el.clientWidth / this.$el.clientHeight;
                this.cameraInstance.updateProjectionMatrix();
                this.$emit("update");
            }
        },
        beforeCreate() {
            let updateRequested = false;
            this.$on("update", () => {
                if (!updateRequested) {
                    this.$nextTick(() => {
                        this.instance.render(this.sceneInstance, this.cameraInstance);
                        updateRequested = false;
                    });
                    updateRequested = true;
                }
            });
        },
        mounted() {
            this.resize();
        }
    };
</script>
