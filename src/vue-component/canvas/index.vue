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
            @touchstart="handleTouchstart"
            @touchmove="handleTouchmove"
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
        LineDashedMaterial,
        MeshBasicMaterial,
        AxisHelper,
        ArrowHelper
    } from "three";

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

    function addDisplacedLinesToGroup(group, lines, displacements, nodes, material) {
        if (!Object.keys(displacements).length) return;
        Object.keys(lines).forEach((l) => {
            const obj = group.getObjectByName(l);
            if (!obj) {
                const n1 = nodes[lines[l].n1], n2 = nodes[lines[l].n2];
                const d1 = displacements[lines[l].n1] || {}, d2 = displacements[lines[l].n2] || {};
                const geo = new Geometry();
                geo.vertices.push(new Vector3(n1.x + (d1.x || 0), n1.y + (d1.y || 0), n1.z + (d1.z || 0)), new Vector3(n2.x + (d2.x || 0), n2.y + (d2.y || 0), n2.z + (d2.z || 0)));
                geo.computeLineDistances();
                const ln = new Line(geo, material);
                ln.name = l;
                group.add(ln);
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
                return new (this.cameraMode === "orthographic" ? OrthographicCamera: PerspectiveCamera)();
            },
            _camera() {
                // リサイズ時に再計算されます。
                if (this.cameraMode === "orthographic") {
                    this.__camera.left = -(this.__camera.right = .5 * this.width);
                    this.__camera.bottom = -(this.__camera.top = .5 * this.height);
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
                // z軸を上(ポール軸)にする。
                scene.rotation.x = -.5 * Math.PI;
                scene.add(this._lineGroup);
                scene.add(this._nodeGroup);
                scene.add(this._boundaryGroup);
                scene.add(this._nodeloadGroup);
                scene.add(this._displacedNodeGroup);
                scene.add(this._displacedLineGroup);
                scene.add(this.axisHelper);
                return scene;
            },
            scene() {
                this._scene.fog = this.sceneFog;
                this._scene.background = this.sceneBackground;
                return this._scene;
            },
            sceneBackground: () => null,
            sceneFog: () => null,
            _lineGroup: () => new Group(),
            lineGroup() {
                Object.keys(this.data.input.lines).forEach((l) => {
                    const obj = this._lineGroup.getObjectByName(l);
                    if (!obj) {
                        const n1 = this.data.input.nodes[this.data.input.lines[l].n1], n2 = this.data.input.nodes[this.data.input.lines[l].n2];
                        const geo = new Geometry();
                        const vector1 = new Vector3(n1.x, n1.y, n1.z);
                        const vector2 = new Vector3(n2.x, n2.y, n2.z);
                        geo.vertices.push(vector1, vector2);
                        const ln = new Line(geo, this.lineMaterial);
                        ln.name = l;
                        this._lineGroup.add(ln);
                        this.$watch(() => this.data.input.nodes[this.data.input.lines[l].n1], (obj) => {
                            vector1.set(obj.x, obj.y, obj.z);
                            geo.verticesNeedUpdate = true;
                        });
                        this.$watch(() => this.data.input.nodes[this.data.input.lines[l].n2], (obj) => {
                            vector2.set(obj.x, obj.y, obj.z);
                            geo.verticesNeedUpdate = true;
                        });
                    }
                });
                return this._lineGroup;
            },
            _nodeGroup: () => new Group(),
            nodeGroup() {
                Object.keys(this.data.input.nodes).forEach((n) => {
                    const obj = this._nodeGroup.getObjectByName(n);
                    if (!obj) {
                        const vector = new Vector3(this.data.input.nodes[n].x, this.data.input.nodes[n].y, this.data.input.nodes[n].z);
                        const geo = new Geometry();
                        geo.vertices.push(vector);
                        const pts = new Points(geo, this.nodeMaterial);
                        pts.name = n;
                        this._nodeGroup.add(pts);
                        this.$watch(() => this.data.input.nodes[n], (obj) => {
                            vector.set(obj.x, obj.y, obj.z);
                            geo.verticesNeedUpdate = true;
                        });
                    }
                });
                return this._nodeGroup;
            },
            _boundaryGroup: () => new Group(),
            boundaryGroup() {
                addBoundaryToGroup(this._boundaryGroup, this.data.input.boundaries, this.data.input.nodes, this.boundaryMaterial);
                return this._boundaryGroup;
            },
            _nodeloadGroup: () => new Group(),
            nodeloadGroup() {
                addNodeloadsToGroup(this._nodeloadGroup, this.data.input.nodeloads, this.data.input.nodes);
                return this._nodeloadGroup;
            },
            _displacedNodeGroup: () => new Group(),
            displacedNodeGroup() {
                addDisplacedNodesToGroup(this._displacedNodeGroup, this.data.result.displacements, this.data.input.nodes, this.displacedNodeMaterial);
                return this._displacedNodeGroup;
            },
            _displacedLineGroup: () => new Group(),
            displacedLineGroup() {
                addDisplacedLinesToGroup(this._displacedLineGroup, this.data.input.lines, this.data.result.displacements, this.data.input.nodes, this.displacedLineMaterial);
                return this._displacedLineGroup;
            },
            axisHelper: () => new AxisHelper(10),
            _nodeMaterial: () => new PointsMaterial(),
            nodeMaterial() {
                this._nodeMaterial.color.set(this.nodeStyle.color);
                this._nodeMaterial.size = this.nodeStyle.size;
                return this._nodeMaterial;
            },
            _lineMaterial: () => new LineBasicMaterial(),
            lineMaterial() {
                this._lineMaterial.color.set(this.lineStyle.color);
                return this._lineMaterial;
            },
            _boundaryMaterial: () => new MeshBasicMaterial(),
            boundaryMaterial() {
                return this._boundaryMaterial;
            },
            _displacedNodeMaterial: () => new PointsMaterial(),
            displacedNodeMaterial() {
                this._displacedNodeMaterial.color.set(this.displacedNodeStyle.color);
                this._displacedNodeMaterial.size = this.displacedNodeStyle.size;
                return this._displacedNodeMaterial;
            },
            displacedLineMaterial: () => new LineDashedMaterial({dashSize: 0.2, gapSize: 0.1, color: 0x88ffff})
        },
        watch: {
            //
            // 変更をwatchしてレンダリングを開始します。
            //
            scene(scene) {
                this.renderer.render(scene, this.camera);
            },
            lineGroup() {
                this.renderer.render(this.scene, this.camera);
            },
            nodeGroup() {
                this.renderer.render(this.scene, this.camera);
            },
            boundaryGroup() {
                this.renderer.render(this.scene, this.camera);
            },
            nodeloadGroup() {
                this.renderer.render(this.scene, this.camera);
            },
            displacedNodeGroup() {
                this.renderer.render(this.scene, this.camera);
            },
            displacedLineGroup() {
                this.renderer.render(this.scene, this.camera);
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
                    const x = this.mouseEvent.clientX - event.clientX;
                    const y = this.mouseEvent.clientY - event.clientY;
                    if (event.ctrlKey) {
                        this.orbit(x, y);
                    } else {
                        this.pan(x, y);
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
            handleTouchstart(event) {
                this.touchEvent = event;
            },
            handleTouchmove(event) {
                const oldX = this.touchEvent.touches.item(0).clientX;
                const newX = event.touches.item(0).clientX;
                const oldY = this.touchEvent.touches.item(0).clientY;
                const newY = event.touches.item(0).clientY;
                if (event.touches.length === 1) {
                    this.orbit((oldX - newX) * .1, (oldY - newY) * .1);
                } else {
                    const oldX1 = this.touchEvent.touches.item(1).clientX;
                    const newX1 = event.touches.item(1).clientX;
                    const oldY1 = this.touchEvent.touches.item(1).clientY;
                    const newY1 = event.touches.item(1).clientY;
                    this.pan((oldX1 + oldX - newX1 - newX) * .05, (oldY1 + oldY - newY1 - newY) * .05);
                    const newLength = Math.hypot(newX1 - newX, newY1 - newY);
                    const oldLength = Math.hypot(oldX1 - oldX, oldY1 - oldY);
                    this.scale(newLength / oldLength - 1);
                }
                this.touchEvent = event;
            }
        }
    };
</script>
