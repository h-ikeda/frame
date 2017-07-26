<template>
    <div @transitionend="resize">
        <canvas ref="canvas" @mousemove="onmove" @mousedown="ondown" @mouseup="onup" @wheel.prevent="onscroll" :style="{backgroundColor}" />
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from "vuex";
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

    export default {
        data() {
            return {
                prevPos: null,
                width: 300,
                height: 150,
                modified: false
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
                "backgroundColor"
            ]),
            ...mapState("component/canvas/three", [
                "perspective",
                "cameraPosition",
                "cameraRotation",
                "position",
                "rotation",
                "scale"
            ]),
            //
            // Three.jsのオブジェクトを生成します。
            // 算出プロパティは計算結果をキャッシュするので、
            // 初期化用プロパティが変更されない限り既に生成したインスタンスが返されます。
            //
            // WebGLRendererを生成・設定します。
            initRenderer() {
                return new WebGLRenderer({
                    canvas: this.$refs.canvas,
                    alpha: true,
                    antialias: true,
                    logarithmicDepthBuffer: true
                });
            },
            renderer() {
                this.initRenderer.setSize(this.width, this.height, false);
                return this.initRenderer;
            },
            // Sceneを生成・設定します。
            roterScene() {
                const rsc = new Scene();
                const line = new LineSegments();
                line.geometry.addAttribute("position", new BufferAttribute(new Float32Array([-100, 0, 0, 100, 0, 0, 0, -100, 0, 0, 100, 0]), 3));
                rsc.add(line);
                return rsc;
            },
            localScene() {
                const scn = new Scene();
                const line = new LineSegments();
                line.geometry.addAttribute("position", new BufferAttribute(new Float32Array([-100, 0, 0, 100, 0, 0, 0, -100, 0, 0, 100, 0]), 3));
                scn.add(line);
                this.roterScene.add(scn);
                return scn;
            },
            // Cameraを生成・設定します。
            initCamera() {
                return this.perspective ? new PerspectiveCamera(): new OrthographicCamera();
            },
            positionedCamera() {
                this.initCamera.position.x = this.cameraPosition.x;
                this.initCamera.position.y = this.cameraPosition.y;
                this.initCamera.position.z = this.cameraPosition.z;
                return this.initCamera;
            },
            rotatedCamera() {
                this.initCamera.rotation.x = this.cameraRotation.x;
                this.initCamera.rotation.y = this.cameraRotation.y;
                this.initCamera.rotation.z = this.cameraRotation.z;
                return this.initCamera;
            },
            resizedCamera() {
                if (this.perspective) {
                    this.initCamera.aspect = this.width / this.height;
                } else {
                    this.initCamera.left = -0.5 * this.width;
                    this.initCamera.right = 0.5 * this.width;
                    this.initCamera.top = 0.5 * this.height;
                    this.initCamera.bottom = -0.5 * this.height;
                }
                this.initCamera.updateProjectionMatrix();
                return this.initCamera;
            },
            camera() {
                return this.positionedCamera && this.rotatedCamera && this.resizedCamera;
            },
            // 要素種別毎のグループを生成し、sceneに追加します。
            lineGroup() {
                const g = new Group();
                this.localScene.add(g);
                return g;
            },
            nodeGroup() {
                const g = new Group();
                this.localScene.add(g);
                return g;
            },
            // 要素種別毎にスタイルを生成します。
            nodeMaterial: () => new PointsMaterial(),
            lineMaterial: () => new LineBasicMaterial()
        },
        watch: {
            // 変数の変更時にスタイルを即時反映します。
            "nodeStyle.color": {
                handler(color) {
                    this.nodeMaterial.color.set(color);
                    this.render();
                },
                immediate: true
            },
            "nodeStyle.size": {
                handler(size) {
                    this.nodeMaterial.size = size;
                    this.render();
                },
                immediate: true
            },
            "lineStyle.color": {
                handler(color) {
                    this.lineMaterial.color.set(color);
                    this.render();
                },
                immediate: true
            },
            "rotation.z": {
                handler(z) {
                    this.roterScene.rotation.z = z;
                },
                immediate: true
            },
            "rotation.x": {
                handler(x) {
                    this.roterScene.rotation.x = x;
                },
                immediate: true
            },
            "position.x": {
                handler(x) {
                    this.localScene.position.x = x;
                },
                immediate: true
            },
            "position.y": {
                handler(y) {
                    this.localScene.position.y = y;
                },
                immediate: true
            },
            "position.z": {
                handler(z) {
                    this.localScene.position.z = z;
                },
                immediate: true
            },
            scale: {
                handler(scale) {
                    this.localScene.scale.x = scale;
                    this.localScene.scale.y = scale;
                    this.localScene.scale.z = scale;
                },
                immediate: true
            },
            perspective() {
                this.render();
            },
            nodes: {
                handler(nodes) {
                    Object.keys(nodes).forEach((n) => {
                        const obj = this.nodeGroup.getObjectByName(n);
                        if (!obj) {
                            const geo = new Geometry();
                            geo.vertices.push(new Vector3(nodes[n].x, nodes[n].y, nodes[n].z));
                            const pts = new Points(geo, this.nodeMaterial);
                            pts.name = n;
                            this.nodeGroup.add(pts);
                        }
                    });
                },
                immediate: true
            },
            lines: {
                handler(lines) {
                    Object.keys(lines).forEach((l) => {
                        const obj = this.lineGroup.getObjectByName(l);
                        if (!obj) {
                            const n1 = this.nodes[lines[l].n1], n2 = this.nodes[lines[l].n2];
                            const geo = new Geometry();
                            geo.vertices.push(new Vector3(n1.x, n1.y, n1.z), new Vector3(n2.x, n2.y, n2.z));
                            const ln = new Line(geo, this.lineMaterial);
                            ln.name = l;
                            this.lineGroup.add(ln);
                        }
                    });
                },
                immediate: true
            }
        },
        mounted() {
            addEventListener("resize", this.resize);
            // 初期描画
            this.resize();
        },
        updated() {
            this.render();
        },
        beforeDestroy() {
            removeEventListener("resize", this.resize);
        },
        methods: {
            ...mapMutations("component/canvas/three", [
                "offsetPosition",
                "offsetRotation",
                "multiplyScale"
            ]),
            render() {
                // レンダリングはDOM更新時に1度だけ行います。
                if (!this.modified) {
                    this.modified = true;
                    this.$nextTick(() => {
                        this.renderer.render(this.roterScene, this.camera);
                        this.modified = false;
                    });
                }
            },
            resize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
                this.render();
            },
            ondown(e) {
                if (!e.button) {
                    this.prevPos = [e.clientX, e.clientY];
                }
            },
            onmove(e) {
                if (this.prevPos) {
                    if (e.shiftKey) {
                        const localX = (e.clientX - this.prevPos[0]) * 0.1;
                        const localZ = (this.prevPos[1] - e.clientY) * 0.1;
                        this.offsetPosition({
                            x: localX * Math.cos(this.rotation.z) + localZ * Math.sin(this.rotation.x) * Math.sin(this.rotation.z),
                            y: -localX * Math.sin(this.rotation.x) + localZ * Math.sin(this.rotation.x) * Math.cos(this.rotation.z),
                            z: localZ * Math.cos(this.rotation.x)
                        });
                    } else {
                        this.offsetRotation({
                            x: (e.clientY - this.prevPos[1]) * 0.1,
                            z: (e.clientX - this.prevPos[0]) * 0.1
                        });
                    }
                    this.render();
                    this.prevPos = [e.clientX, e.clientY];
                }
            },
            onup(e) {
                if(!e.button) {
                    this.prevPos = null;
                }
            },
            onscroll(e) {
                this.multiplyScale(1 + e.deltaY * 0.001);
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
