<template>
    <canvas-renderer class="frame-canvas" :alpha="true" :antialias="true" :logarithmicDepthBuffer="true" @mousemove.native="onmove" @mousedown.native="ondown" @mouseup.native="onup" @wheel.prevent.native="onscroll" :style="canvasStyle">
        <canvas-scene :rotationX="rotation.x" :rotationZ="rotation.z" :scaleX="scale" :scaleY="scale" :scaleZ="scale">
            <canvas-line v-for="line, id in linesInCoodinateSystem" :key="id" :x1="line.x1" :y1="line.y1" :z1="line.z1" :x2="line.x2" :y2="line.y2" :z2="line.z2" :color="lineColor" />
            <canvas-point v-for="node, id in nodes" :key="id" :x="node.x" :y="node.y" :z="node.z" :color="nodeColor" :size="nodeSize" />
        </canvas-scene>
        <canvas-camera :position="{x:0, y:-10, z:0}" :lookAt="{x: 0, y: 0, z: 0}" />
    </canvas-renderer>
</template>

<script>
    import {mapState} from "vuex";
    import components from "./component";
    import prefixed from "prefix-keys";

    export default {
        data() {
            return {
                prevPos: null,
                rotation: {
                    x: 0,
                    z: 0
                },
                scale: 1
            }
        },
        computed: {
            // Vuexのステートから必要な変数を展開します。
            ...mapState("model/input", [
                "nodes",
                "lines"
            ]),
            ...mapState("component/canvas", {
                lineColor: (state) => state.lines.color,
                nodeColor: (state) => state.nodes.color,
                nodeSize: (state) => state.nodes.size,
                canvasStyle: (state) => ({backgroundColor: state.backgroundColor})
            }),
            // 梁要素の位置座標を計算した結果を返します。
            // keyがオリジナルのid、valueが対応する梁要素の座標となります。
            linesInCoodinateSystem() {
                const t = {};
                Object.keys(this.lines).forEach((key) => {
                    const {x: x1, y: y1, z: z1} = this.nodes[this.lines[key].n1];
                    const {x: x2, y: y2, z: z2} = this.nodes[this.lines[key].n2];
                    t[key] = {x1, y1, z1, x2, y2, z2};
                });
                return t;
            }
        },
        methods: {
            ondown(e) {
                if (!e.button) {
                    this.prevPos = [e.clientX, e.clientY];
                }
            },
            onmove(e) {
                if (this.prevPos) {
                    if (e.shiftKey) {

                    } else {
                        this.rotation.z += (e.clientX - this.prevPos[0]) * 0.1;
                        this.rotation.x += (e.clientY - this.prevPos[1]) * 0.1;
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
                const scale = (1 + e.deltaY * 0.001) * this.scale;
                if (scale > 0.1 && scale < 10) {
                    this.scale = scale;
                }
            }
        },
        components: prefixed("canvas-", components)
    };
</script>

<style scoped>
    .frame-canvas {
        width: 100%;
        height: 100%;
    }
</style>
