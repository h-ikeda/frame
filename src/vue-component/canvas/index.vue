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
        Mesh,
        BufferAttribute,
        Geometry,
        CylinderGeometry,
        PointsMaterial,
        LineBasicMaterial,
        MeshBasicMaterial,
        AxisHelper,
        ArrowHelper
    } from "three";

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

    function addBoundaryToGroup(group, boundaries, nodes, material) {
        Object.keys(boundaries).forEach((n) => {
            const obj = group.getObjectByName(n);
            if (!obj) {
                if (boundaries[n].x === true && boundaries[n].y === true && boundaries[n].z === true) {
                    const geo = new CylinderGeometry(0, .25, .4);
                    const mesh = new Mesh(geo, material);
                    mesh.name = n;
                    mesh.position.x = nodes[boundaries[n].node].x;
                    mesh.position.y = nodes[boundaries[n].node].y;
                    mesh.position.z = nodes[boundaries[n].node].z - .2;
                    mesh.rotation.x = .5 * Math.PI;
                    group.add(mesh);
                }
            }
        });
    }
    
    function addNodeloadsToGroup(group, nodeloads, nodes) {
        Object.keys(nodeloads).forEach((n) => {
            const obj = group.getObjectByName(n);
            if (!obj) {
                const dir = new Vector3(nodeloads[n].x, nodeloads[n].y, nodeloads[n].z);
                const origin = new Vector3(nodes[nodeloads[n].node].x, nodes[nodeloads[n].node].y, nodes[nodeloads[n].node].z);
                origin.add(dir.clone().negate());
                const arrow = new ArrowHelper(dir.clone().normalize(), origin, dir.length(), 0x888888, dir.length() * 0.3, dir.length() * 0.2);
                arrow.name = n;
                group.add(arrow);
            }
        });
    }

    function addDisplacedNodesToGroup(group, displacements, nodes, material) {
        Object.keys(nodes).forEach((n) => {
            const obj = group.getObjectByName(n);
            if (!obj && n in displacements) {
                const geo = new Geometry();
                const pos = new Vector3(nodes[n].x, nodes[n].y, nodes[n].z);
                pos.x += displacements[n].x || 0;
                pos.y += displacements[n].y || 0;
                pos.z += displacements[n].z || 0;
                geo.vertices.push(pos);
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
            // モデルデータ
            ...mapGetters("model", [
                "data"
            ]),
            // スタイル設定
            ...mapState("component/canvas", [
                "lineStyle",
                "nodeStyle",
                "displacedNodeStyle",
                "backgroundColor"
            ]),
            // WebGLオプション
            ...mapState("component/canvas/three", [
                "cameraMode",
                "antialias"
            ]),
            // カメラ位置の計算
            ...mapGetters("component/canvas/three/orbit", [
                "position",
                "target"
            ]),
            _renderer() {
                // オプションを変更すると、再計算されます。
                return new WebGLRenderer({
                    canvas: this.$refs.canvas,
                    antialias: this.antialias,
                    alpha: true,
                    logarithmicDepthBuffer: true
                });
            },
            renderer() {
                // リサイズ時に再計算されます。
                this._renderer.setSize(this.width, this.height, false);
                return this._renderer;
            },
            __camera() {
                // オプションを変更すると、再計算されます。
                return new(this.cameraMode === "orthographic" ? OrthographicCamera: PerspectiveCamera)();
            },
            _camera() {
                // リサイズ時に再計算されます。
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
                // カメラ位置変更時に再計算されます。
                this._camera.position.copy(this.position);
                this._camera.lookAt(this.target);
                return this._camera;
            },
            _scene() {
                const scene = new Scene();
                scene.rotation.x = -.5 * Math.PI;
                scene.add(this.lineGroup);
                scene.add(this.nodeGroup);
                scene.add(this.boundaryGroup);
                scene.add(this.nodeloadGroup);
                scene.add(this.displacedNodeGroup);
                scene.add(this.axisHelper);
                return scene;
            },
            scene() {
                this.nodeMaterial.color.set(this.nodeStyle.color);
                this.nodeMaterial.size = this.nodeStyle.size;
                this.lineMaterial.color.set(this.lineStyle.color);
                this.displacedNodeMaterial.color.set(this.displacedNodeStyle.color);
                this.displacedNodeMaterial.size = this.displacedNodeStyle.size;
                addNodesToNodeGroup(this.nodeGroup, this.data.input.nodes, this.nodeMaterial);
                addLinesToLineGroup(this.lineGroup, this.data.input.lines, this.data.input.nodes, this.lineMaterial);
                addBoundaryToGroup(this.boundaryGroup, this.data.input.boundaries, this.data.input.nodes, this.boundaryMaterial);
                addNodeloadsToGroup(this.nodeloadGroup, this.data.input.nodeloads, this.data.input.nodes);
                addDisplacedNodesToGroup(this.displacedNodeGroup, this.data.result.displacements, this.data.input.nodes, this.displacedNodeMaterial);
                return this._scene;
            },
            lineGroup: () => new Group(),
            nodeGroup: () => new Group(),
            boundaryGroup: () => new Group(),
            nodeloadGroup: () => new Group(),
            displacedNodeGroup: () => new Group(),
            displacedLineGroup: () => new Group(),
            axisHelper: () => new AxisHelper(10),
            nodeMaterial: () => new PointsMaterial(),
            lineMaterial: () => new LineBasicMaterial(),
            boundaryMaterial: () => new MeshBasicMaterial(),
            displacedNodeMaterial: () => new PointsMaterial(),
            displacedLineMaterial: () => new LineBasicMaterial()
        },
        watch: {
            //
            // 変更をwatchしてレンダリングを開始します。
            //
            scene(scene) {
                this.renderer.render(scene, this.camera);
            },
            camera(camera) {
                this.renderer.render(this.scene, camera);
            },
            //
            // レンダラーが再生成された時に反応する。
            // サイズ変更時はcameraの変更により呼ばれる。
            //
            antialias() {
                this.renderer.render(this.scene, this.camera);
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
            //
            // ここからは、イベントハンドリングの定義です。
            //
            ...mapActions("component/canvas/three/orbit", [
                "rotate",
                "zoom",
                "translate2D"
            ]),
            pan(x, y) {
                this.translate2D([x, -y]);
            },
            orbit(x, y) {
                this.rotate([y, x]);
            },
            scale(s) {
                this.zoom(s);
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
                this.scale(event.deltaY * .005);
            },
            handleGesturestart(event) {
                this.gestureEvent = event;
            },
            handleGesturechange(event) {
                this.scale(event.scale / this.gestureEvent.scale - 1);
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
