<template>
    <canvas class="frame-canvas" @mousemove="dragged" @mousedown="pressed" @mouseup="released" @wheel.prevent="wheeled" :style="{backgroundColor}" />
</template>

<script>
    import {mapState, mapMutations} from "vuex";
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

    function initializeCamera(camera, position, rotation) {
        setPosition(camera, position);
        setRotation(camera, rotation);
    }

    function initializeScene(scene, position, rotation, scale) {
        setPosition(scene, position);
        setRotation(scene, rotation);
        setScale(scene, scale);
    }

    function setPosition(obj, position) {
        obj.position.x = position.x;
        obj.position.y = position.y;
        obj.position.z = position.z;
    }

    function setRotation(obj, rotation) {
        obj.rotation.x = rotation.x;
        obj.rotation.y = rotation.y;
        obj.rotation.z = rotation.z;
    }

    function setScale(obj, scale) {
        obj.scale.x = scale;
        obj.scale.y = scale;
        obj.scale.z = scale;
    }

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
            ...mapState("model/input", [
                "nodes",
                "lines"
            ]),
            ...mapState("component/canvas", [
                "lineStyle",
                "nodeStyle",
                "backgroundColor",
                "antialias"
            ]),
            ...mapState("component/canvas/three", [
                "perspective",
                "cameraPosition",
                "cameraRotation",
                "position",
                "rotation",
                "scale"
            ]),
            renderer() {
                const vm = this;
                return new WebGLRenderer({
                    canvas: vm.$el,
                    alpha: true,
                    antialias: vm.antialias,
                    logarithmicDepthBuffer: true
                });
            },
            camera() {
                return this.perspective ? new PerspectiveCamera(): new OrthographicCamera();
            },
            scene: () => new Scene(),
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
            "rotation.x": function(x) {
                this.scene.rotation.x = x;
                this.render();
            },
            "rotation.y": function(y) {
                this.scene.rotation.y = y;
                this.render();
            },
            "rotation.z": function(z) {
                this.scene.rotation.z = z;
                this.render();
            },
            "position.x": function(x) {
                this.scene.position.x = x;
                this.render();
            },
            "position.y": function(y) {
                this.scene.position.y = y;
                this.render();
            },
            "position.z": function(z) {
                this.scene.position.z = z;
                this.render();
            },
            scale(scale) {
                setScale(this.scene, scale);
                this.render();
            },
            perspective() {
                const vm = this;
                initializeCamera(vm.camera, vm.cameraPosition, vm.cameraRotation);
                setCameraSize(vm.camera, vm.$el);
                vm.render();
            },
            "cameraRotation.x": function(x) {
                this.camera.rotation.x = x;
                this.render();
            },
            "cameraRotation.y": function(y) {
                this.camera.rotation.y = y;
                this.render();
            },
            "cameraRotation.z": function(z) {
                this.camera.rotation.z = z;
                this.render();
            },
            "cameraPosition.x": function(x) {
                this.camera.position.x = x;
                this.render();
            },
            "cameraPosition.y": function(y) {
                this.camera.position.y = y;
                this.render();
            },
            "cameraPosition.z": function(z) {
                this.camera.position.z = z;
                this.render();
            },
            antialias() {
                setRendererSize(this.renderer);
                this.render();
            }
        },
        beforeCreate() {
            const vm = this;
            let reserved = false;
            vm.$on("render", () => {
                // レンダリングは更新時に1度だけ行います。
                if (!reserved) {
                    reserved = true;
                    vm.$nextTick(() => {
                        vm.renderer.render(vm.scene, vm.camera);
                        reserved = false;
                    });
                }
            });
        },
        created() {
            const vm = this;
            initializeScene(vm.scene, vm.position, vm.rotation, vm.scale);
            initializeMaterial(vm.nodeMaterial, vm.nodeStyle);
            initializeMaterial(vm.lineMaterial, vm.lineStyle);
            addLinesToLineGroup(vm.lineGroup, vm.lines, vm.nodes, vm.lineMaterial);
            addNodesToNodeGroup(vm.nodeGroup, vm.nodes, vm.nodeMaterial);
            vm.scene.add(vm.lineGroup);
            vm.scene.add(vm.nodeGroup);
        },
        mounted() {
            const vm = this;
            initializeCamera(vm.camera, vm.cameraPosition, vm.cameraRotation);
            addEventListener("resize", vm.resize);
            vm.resize();
        },
        beforeDestroy() {
            removeEventListener("resize", this.resize);
        },
        methods: {
            ...mapMutations("component/canvas/three", [
                "offset",
                "rotate",
                "zoom",
                "offsetCamera",
                "rotateCamera",
                "setCameraRotation"
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
            lookAt(x, y, z) {
                if (process.env.NODE_ENV !== "production") {
                    if (typeof x !== "number") {
                        throw "Argument x shold be a number.";
                    }
                    if (typeof y !== "number") {
                        throw "Argument y should be a number.";
                    }
                    if (typeof z !== "number") {
                        throw "Argument z shold be a number.";
                    }
                }
                this.camera.lookAt(new Vector3(x, y, z));
                this.setCameraRotation(this.camera.rotation);
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

                    // 下記のコマンドでオブジェクトを移動、回転できる。
                    // 移動の場合はユークリッド空間の座標、
                    // 回転の場合はオイラー角[単位:rad] (x: x軸周りの回転角, y: y軸周りの回転角, z: z軸周りの回転角)

                    // vm.rotate({x, y, z}) -> sceneオブジェクトをsceneオブジェクトの原点を中心に回転。
                    // vm.rotateCamera({x, y, z}) -> cameraオブジェクトの視線方向を回転。
                    // vm.offset({x, y, z}) -> sceneオブジェクトをグローバル座標系で平行移動。
                    // vm.offsetCamera({x, y, z}) -> cameraオブジェクトをグローバル座標系で平行移動。

                    // vm.lookAt(x, y, z) -> cameraオブジェクトの視線を点(x, y, z)に向ける。

                    if (e.shiftKey) {
                        // Shiftキー + ドラッグ -> 移動 (Pan)
                        vm.offset({
                            x: x * Math.cos(vm.rotation.z) - y * Math.sin(vm.rotation.x) * Math.sin(vm.rotation.z),
                            y: -x * Math.sin(vm.rotation.x) - y * Math.sin(vm.rotation.x) * Math.cos(vm.rotation.z),
                            z: -y * Math.cos(vm.rotation.x)
                        });
                    } else {
                        // 単純にドラッグ -> 回転 (Rotate)
                        vm.rotate({
                            x: y,
                            z: x
                        });
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
    .frame-canvas {
        width: 100%;
        height: 100%;
    }
</style>
