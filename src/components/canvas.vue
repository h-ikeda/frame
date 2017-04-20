<template>
    <canvas></canvas>
</template>

<script>
    import * as THREE from "three";

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
                scene: null
            }
        },
        methods: {
            resize() {
                this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
                this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
                this.camera.updateProjectionMatrix();
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

            const model = this.$store.state.model;
            var material = new THREE.LineBasicMaterial();
            Object.keys(model.lines).forEach(key => {
                var line = model.lines[key];
                var n1 = model.nodes[line.n1];
                var n2 = model.nodes[line.n2];
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(n1.x, n1.y, n1.z));
                geometry.vertices.push(new THREE.Vector3(n2.x, n2.y, n2.z));
                var lineObject = new THREE.Line(geometry, material);
                this.scene.add(lineObject);
            });
            material = new THREE.PointsMaterial({color: 0xff0000});
            Object.values(model.nodes).forEach(node => {
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(node.x, node.y, node.z));
                var points = new THREE.Points(geometry, material);
                this.scene.add(points);
            });

            setInterval(()=>{
                this.scene.rotation.x += 0.08;
                this.scene.rotation.z += 0.03;
            }, 15);

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
