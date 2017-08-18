<template>
    <a-entity>
        <a-entity v-for="line of movedLines" :line="line.props" :key="line.id" />
    </a-entity>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapState("component/canvas", ["displacedLineStyle"]),
            ...mapGetters("model", {
                nodes: "input/nodes/data",
                lines: "input/lines/data",
                displacements: "result/displacements/data"
            }),
            movedLines() {
                return Object.keys(this.lines).map((id) => {
                    const n1 = this.nodes[this.lines[id].n1];
                    const n2 = this.nodes[this.lines[id].n2];
                    const dis1 = this.displacements[this.lines[id].n1] || {};
                    const dis2 = this.displacements[this.lines[id].n2] || {};
                    return {
                        props: `start: ${n1.x + (dis1.x || 0)} ${n1.y + (dis1.y || 0)} ${n1.z + (dis1.z || 0)}; end: ${n2.x + (dis2.x || 0)} ${n2.y + (dis2.y || 0)} ${n2.z + (dis2.z || 0)}; color: ${this.displacedLineStyle.color}; opacity: 0.1`,
                        id
                    };
                });
            }
        }
    };
</script>
