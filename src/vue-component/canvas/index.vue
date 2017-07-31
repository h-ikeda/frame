<template>
    <div @transitionend="resize">
        <canvas
            ref="canvas"
            @mousedown.left="handleMousedown"
            @mouseup.left="handleMouseup"
            @mousemove="handleMousemove"
            @wheel.prevent="handleWheel"
            @gesturestart.prevent="handleGesturestart"
            @gesturechange.prevent="handleGesturechange"
            @gestureend.prevent="handleGestureend"
            @touchstart="handleTouchstart"
            @touchend="handleTouchend"
            :style="{backgroundColor}"
        />
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
                mouseEvent: null,
                gestureEvent: null
            };
        },
        computed: {
            // Vuexのステートから必要な変数を展開します。
            ...mapGetters("model/input", [
                "data"
            ]),
            ...mapState("component/canvas", [
                "lineStyle",
                "nodeStyle",
                "backgroundColor",
                "antialias"
            ]),
            ...mapState("component/canvas/three", [
                "cameraMode",
                "acceralation"
            ]),
            ...mapGetters("component/canvas/three/orbit", [
                "position",
                "target"
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
                camera.lookAt(this.target);
                return camera;
            },
            scene: () => {
                const scene = new Scene();
                scene.rotation.x = -.5 * Math.PI;
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
            camera() {
                this.render();
            }
        },
        beforeCreate() {
            //
            // レンダリングのトリガーとなるイベントハンドラを定義。
            //
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
            addLinesToLineGroup(vm.lineGroup, vm.data.lines, vm.data.nodes, vm.lineMaterial);
            addNodesToNodeGroup(vm.nodeGroup, vm.data.nodes, vm.nodeMaterial);
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
                "zoom",
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
            handleMousedown(event) {
                this.mouseEvent = event;
            },
            handleMouseup() {
                this.mouseEvent = null;
            },
            handleMousemove(event) {
                if (this.mouseEvent) {
                    const [x, y] = ["clientX", "clientY"].map((c) => this.mouseEvent[c] - event[c]);
                    if (event.shiftKey) {
                        this.pan(x, y);
                    } else {
                        this.orbit(x, y);
                    }
                    this.mouseEvent = event;
                }
            },
            handleWheel(event) {
                console.log(gestureSupport);
                this.orbit(event.deltaX, event.deltaY);
            },
            pan(x, y) {
                const m = this.acceralation.pan;
                this.translate2D([x * m, -y * m]);
            },
            orbit(x, y) {
                const m = this.acceralation.rotation;
                this.rotate([y * m, x * m]);
            },
            scale(s) {
                const m = this.acceralation.zoom;
                this.zoom(1 + s * m);
            },
            handleGesturestart(event) {
                this.gestureEvent = event;
            },
            handleGesturechange(event) {
                this.scale((event.scale - this.gestureEvent.scale) * 1000);
                this.gestureEvent = event;
            },
            handleGestureend() {
                this.gestureEvent = null;
            },
            handleTouchstart(event) {
                console.log("touched.");
            },
            handleTouchend() {
                console.log("touch end.");
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
