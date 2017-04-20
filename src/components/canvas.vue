<template>
    <canvas></canvas>
</template>

<script>
    import * as THREE from "three";
    export default {
        data() {
            return {
                scene: null,
                renderer: null,
                camera: null
            }
        },
        mounted() {
            var w = this.$el.clientWidth;
            var h = this.$el.clientHeight;
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.$el,
                alpha: true
            });
            //this.renderer.setSize( w, h );

            this.camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );
            this.camera.position.y = -10;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

            this.scene = new THREE.Scene();

            var model = {
                nodes: {
                    0: {x: 0, y: 0, z: 0},
                    1: {x: 1, y: 1, z: 1}
                },
                lines: {
                    0: {n1: 0, n2: 1, EA: 1}
                }
            };
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

            const render = () => {
                requestAnimationFrame( render );
                this.scene.rotation.x += 0.08;
                this.scene.rotation.z += 0.03;
                this.renderer.render( this.scene, this.camera );
            }
            render();
        }
    };
</script>

<style scoped>
    canvas {
        background-color: #9E9E9E;
    }
</style>