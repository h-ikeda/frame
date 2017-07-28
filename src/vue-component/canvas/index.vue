<template>
    <div @transitionend="resize">
        <canvas ref="canvas" @mousemove="dragged" @mousedown="pressed" @mouseup="released" @wheel.prevent="wheeled" :style="{backgroundColor}" />
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
    import {
        WebGLRenderer,
        Scene,
        OrthographicCamera,
        PerspectiveCamera,
        Vector3,
        Group,
        Points,
        Line,
        LineSegments,
        BufferAttribute,
        Geometry,
        PointsMaterial,
        LineBasicMaterial
    } from "three";

    function setCameraSize(camera, domElement) {
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        if (camera.isPerspectiveCamera) {
            camera.aspect = width / height;
        } else {
            camera.left = -0.5 * width;
            camera.right = 0.5 * width;
            camera.top = 0.5 * height;
            camera.bottom = -0.5 * height;
        }
        camera.updateProjectionMatrix();
    }

    function setRendererSize(renderer) {
        const domElement = renderer.domElement;
        renderer.setSize(domElement.clientWidth, domElement.clientHeight, false);
    }

    function initializeMaterial(material, options) {
        if ("color" in options) {
            material.color.set(options.color);
        }
        if ("size" in options) {
            material.size = options.size;
        }
    }

    function addLinesToLineGroup(group, lines, nodes, material) {
        Object.keys(lines).forEach((l) => {
            const obj = group.getObjectByName(l);
            if (!obj) {
                const n1 = nodes[lines[l].n1], n2 = nodes[lines[l].n2];
                const geo = new Geometry();
                geo.vertices.push(new Vector3(n1.x, n1.y, n1.z), new Vector3(n2.x, n2.y, n2.z));
                const ln = new Line(geo, material);
                ln.name = l;
                group.add(ln);
            }
        });
    }

    function addNodesToNodeGroup(group, nodes, material) {
        Object.keys(nodes).forEach((n) => {
            const obj = group.getObjectByName(n);
            if (!obj) {
                const geo = new Geometry();
                geo.vertices.push(new Vector3(nodes[n].x, nodes[n].y, nodes[n].z));
                const pts = new Points(geo, material);
                pts.name = n;
                group.add(pts);
            }
        });
    }

    export default {
        data() {
            return {
                mouseX: 0,
                mouseY: 0,
                mouseLeft: false,
                mouseMiddle: false,
                mouseRight: false
            };
        },
        computed: {
            // Vuexのステートから必要な変数を展開します。
            ...mapGetters("model/input/nodes", {
                nodes: "data"
            }),
            ...mapGetters("model/input/lines", {
                lines: "data"
            }),
            ...mapState("component/canvas", [
                "lineStyle",
                "nodeStyle",
                "backgroundColor",
                "antialias"
            ]),
            ...mapState("component/canvas/three", [
                "cameraMode"
            ]),
            ...mapState("component/canvas/three/orbit", [
                "target"
            ]),
            ...mapGetters("component/canvas/three/orbit", [
                "position"
            ]),
            renderer() {
                return new WebGLRenderer({
                    canvas: this.$refs.canvas,
                    alpha: true,
                    antialias: this.antialias,
                    logarithmicDepthBuffer: true
                });
            },
            initialCamera() {
                switch (this.cameraMode) {
                    case "orthographic":
                        return new OrthographicCamera();
                    default:
                        return new PerspectiveCamera();
                }
            },
            camera() {
                const camera = this.initialCamera;
                camera.position.copy(this.position);
                camera.lookAt(new Vector3(...this.target));
                return camera;
            },
            scene: () => {
                const scene = new Scene();
                //scene.scale.y = -1;
                scene.rotation.x = -.5 * Math.PI;
                //scene.rotation.z = -.5 * Math.PI;
                return scene;
            },
            lineGroup: () => new Group(),
            nodeGroup: () => new Group(),
            nodeMaterial: () => new PointsMaterial(),
            lineMaterial: () => new LineBasicMaterial()
        },
        watch: {
            "nodeStyle.color": function(color) {
                this.nodeMaterial.color.set(color);
                this.render();
            },
            "nodeStyle.size": function(size) {
                this.nodeMaterial.size = size;
                this.render();
            },
            "lineStyle.color": function(color) {
                this.lineMaterial.color.set(color);
                this.render();
            },
            cameraMode() {
                const vm = this;
                setCameraSize(vm.camera, vm.$el);
                vm.render();
            },
            antialias() {
                setRendererSize(this.renderer);
                this.render();
            }
        },
        beforeCreate() {
            let reserved = false;
            this.$on("render", () => {
                // レンダリングは更新時に1度だけ行います。
                if (!reserved) {
                    reserved = true;
                    this.$nextTick(() => {
                        this.renderer.render(this.scene, this.camera);
                        reserved = false;
                    });
                }
            });
        },
        created() {
            const vm = this;
            initializeMaterial(vm.nodeMaterial, vm.nodeStyle);
            initializeMaterial(vm.lineMaterial, vm.lineStyle);
            addLinesToLineGroup(vm.lineGroup, vm.lines, vm.nodes, vm.lineMaterial);
            addNodesToNodeGroup(vm.nodeGroup, vm.nodes, vm.nodeMaterial);
            vm.scene.add(vm.lineGroup);
            vm.scene.add(vm.nodeGroup);
            //
            // xのベースライン
            //
            let mat = new LineBasicMaterial();
            mat.color.set(0xff0000);
            let geo = new Geometry();
            geo.vertices.push(new Vector3(0, 0, 0), new Vector3(10, 0, 0));
            vm.scene.add(new Line(geo, mat));
            //
            // yのベースライン
            //
            mat = new LineBasicMaterial();
            mat.color.set(0x0000ff);
            geo = new Geometry();
            geo.vertices.push(new Vector3(0, 0, 0), new Vector3(0, 10, 0));
            vm.scene.add(new Line(geo, mat));
            //
            // zのベースライン
            //
            mat = new LineBasicMaterial();
            mat.color.set(0xffff00);
            geo = new Geometry();
            geo.vertices.push(new Vector3(0, 0, 0), new Vector3(0, 0, 10));
            vm.scene.add(new Line(geo, mat));
        },
        mounted() {
            addEventListener("resize", this.resize);
            this.resize();
        },
        beforeDestroy() {
            removeEventListener("resize", this.resize);
        },
        methods: {
            ...mapActions("component/canvas/three/orbit", [
                "rotate",
                "translate2D"
            ]),
            render() {
                this.$emit("render");
            },
            resize() {
                const vm = this;
                setCameraSize(vm.camera, vm.$el);
                setRendererSize(vm.renderer);
                vm.render();
            },
            pressed(e) {
                // canvas要素上でマウスボタンが押されたときに呼ばれます。
                const vm = this;
                switch (e.button) {
                    case 0:
                        vm.mouseLeft = true;
                        break;
                    case 1:
                        vm.mouseMiddle = true;
                        break;
                    case 2:
                        vm.mouseRight = true;
                }
                vm.mouseX = e.clientX;
                vm.mouseY = e.clientY;
            },
            dragged(e) {
                const vm = this;
                if (vm.mouseLeft) {
                    // 左ドラッグ時の動作
                    // canvas要素 (画面) 上でのマウスの移動距離x, y
                    const x = (e.clientX - vm.mouseX) * 0.1;
                    const y = (e.clientY - vm.mouseY) * 0.1;

                    if (e.shiftKey) {
                        // Shiftキー + ドラッグ -> 移動 (Pan)
                        vm.translate2D([-x, y]);
                    } else {
                        // 単純にドラッグ -> 回転 (Rotate)
                        vm.rotate([-y, -x]);
                    }
                    vm.render();
                    vm.mouseX = e.clientX;
                    vm.mouseY = e.clientY;
                }
            },
            released(e) {
                const vm = this;
                switch (e.button) {
                    case 0:
                        vm.mouseLeft = false;
                        break;
                    case 1:
                        vm.mouseMiddle = false;
                        break;
                    case 2:
                        vm.mouseRight = false;
                }
            },
            wheeled(e) {
                this.zoom(1 + e.deltaY * 0.001);
                this.render();
            }
        }
    };
</script>

<style scoped>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>
