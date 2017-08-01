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
            @touchstart.prevent="handleTouchstart"
            @touchmove.prevent="handleTouchmove"
            @touchend.prevent="handleTouchend"
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
        LineBasicMaterial,
        AxisHelper
    } from "three";

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
                width: 300,
                height: 150,
                mouseEvent: null,
                gestureEvent: null,
                touchEvent: null
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
            _renderer() {
                return new WebGLRenderer({
                    canvas: this.$refs.canvas,
                    antialias: this.antialias,
                    alpha: true,
                    logarithmicDepthBuffer: true
                });
            },
            renderer() {
                this._renderer.setSize(this.width, this.height, false);
                return this._renderer;
            },
            __camera() {
                return this.cameraMode === "orthographic" ? new OrthographicCamera(): new PerspectiveCamera();
            },
            _camera() {
                if (this.cameraMode === "orthographic") {
                    this.__camera.left = -0.5 * this.width;
                    this.__camera.right = 0.5 * this.width;
                    this.__camera.top = 0.5 * this.height;
                    this.__camera.bottom = -0.5 * this.height;
                } else {
                    this.__camera.aspect = this.width / this.height;
                }
                this.__camera.updateProjectionMatrix();
                return this.__camera;
            },
            camera() {
                this._camera.position.copy(this.position);
                this._camera.lookAt(this.target);
                return this._camera;
            },
            _scene() {
                const scene = new Scene();
                scene.rotation.x = -.5 * Math.PI;
                scene.add(this.lineGroup);
                scene.add(this.nodeGroup);
                scene.add(this.axisHelper);
                return scene;
            },
            scene() {
                initializeMaterial(this.nodeMaterial, this.nodeStyle);
                initializeMaterial(this.lineMaterial, this.lineStyle);
                addLinesToLineGroup(this.lineGroup, this.data.lines, this.data.nodes, this.lineMaterial);
                addNodesToNodeGroup(this.nodeGroup, this.data.nodes, this.nodeMaterial);
                return this._scene;
            },
            lineGroup: () => new Group(),
            nodeGroup: () => new Group(),
            axisHelper: () => new AxisHelper(10),
            nodeMaterial: () => new PointsMaterial(),
            lineMaterial: () => new LineBasicMaterial()
        },
        watch: {
            scene(scene) {
                this.renderer.render(scene, this.camera);
            },
            camera(camera) {
                this.renderer.render(this.scene, camera);
            }
        },
        mounted() {
            addEventListener("resize", this.resize);
            this.resize();
        },
        beforeDestroy() {
            removeEventListener("resize", this.resize);
        },
        methods: {
            resize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            },
            ...mapActions("component/canvas/three/orbit", [
                "rotate",
                "zoom",
                "translate2D"
            ]),
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
                this.scale(-event.deltaY);
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
                this.zoom(1 + s * this.acceralation.zoom);
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
                this.touchEvent = event;
            },
            handleTouchmove(event) {
                const x = event.changedTouches.item(0).clientX - this.touchEvent.changedTouches.item(0).clientX;
                const y = event.changedTouches.item(0).clientY - this.touchEvent.changedTouches.item(0).clientY;
                this.orbit(x * -.1, y * -.1);
                this.touchEvent = event;
            },
            handleTouchend() {
                this.touchEvent = null;
            }
        }
    };
</script>
