<template>
    <canvas @mousemove="onmove" @mousedown="ondown" @mouseup="onup" @wheel.prevent="onscroll"></canvas>
</template>

<script>
    import * as THREE from "three";
    import Nodes from "./class-nodes";
    import Lines from "./class-lines";

    function render(renderer, scene, camera) {
        function inner() {
            requestAnimationFrame(inner);
            renderer.render(scene, camera);
        }
        inner();
    }

    export default {
        data() {
            return {
                camera: null,
                renderer: null,
                scene: null,
                prevPos: null
            }
        },
        methods: {
            resize() {
                this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
                this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
                this.camera.updateProjectionMatrix();
            },
            ondown(e) {
                if (!e.button) {
                    this.prevPos = [e.clientX, e.clientY];
                }
            },
            onmove(e) {
                if (this.prevPos) {
                    if (e.shiftKey) {

                    } else {
                        this.scene.rotation.z += (e.clientX - this.prevPos[0]) * 0.1;
                        this.scene.rotation.x += (e.clientY - this.prevPos[1]) * 0.1;
                    }
                    this.prevPos = [e.clientX, e.clientY];
                }
            },
            onup(e) {
                if(!e.button) {
                    this.prevPos = null;
                }
            },
            onscroll(e) {
                const scale = 1 + e.deltaY * 0.01;
                this.scene.scale.x *= scale;
                this.scene.scale.y *= scale;
                this.scene.scale.z *= scale;
            }
        },
        mounted() {
            this.camera = new THREE.PerspectiveCamera();
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.$el,
                alpha: true,
                antialias: true,
                logarithmicDepthBuffer: true
            });
            this.scene = new THREE.Scene();

            this.camera.position.y = -10;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

            const model = this.$store.state.databaseConnection.model;
            this.scene.add((new Lines(model.lines, model.nodes)).group);
            this.scene.add((new Nodes(model.nodes)).group);


            addEventListener("resize", this.resize);
            this.$store.watch(state => state.componentStates.splitPosition, this.resize, {
                immediate: true
            })
            render(this.renderer, this.scene, this.camera);
        }
    };
</script>

<style scoped>
    canvas {
        background-color: #9E9E9E;
    }
</style>
