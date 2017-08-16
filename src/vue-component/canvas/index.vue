<template>
    <a-scene embedded>
        <a-entity>
            <a-entity v-for="point of points" :point="point.props" :position="point.pos" :key="point.id" />
        </a-entity>
        <a-entity>
            <a-entity v-for="line of lines" :line="line.props" :key="line.id" />
        </a-entity>
        <a-entity>
            <a-cone v-for="cone of cones" radius-top="0" radius-bottom=".25" height=".4" rotation="90 0 0" :position="cone.pos" :key="cone.id" />
        </a-entity>
        <a-entity>
            <a-entity v-for="arrow of arrows" :position="arrow.pos" :arrow="arrow.props" :key="arrow.id" />
        </a-entity>
        <a-entity v-if="calculated">
            <a-entity v-for="point of movedPoints" :point="point.props" :position="point.pos" :key="point.id" />
        </a-entity>
        <a-entity v-if="calculated">
            <a-entity v-for="line of movedLines" :line="line.props" :key="line.id" />
        </a-entity>
        <a-sky :color="backgroundColor" />
        <a-entity rotation="90 0 0" position="-3 -10 0">
            <a-camera look-controls="reverseMouseDrag: true" />
        </a-entity>
    </a-scene>
</template>

<script>
    import "aframe";
    import "aframe-point-component";
    import "aframe-arrow-component";
    import "aframe-orbit-controls-component";
    import {mapGetters, mapState} from "vuex";

    export default {
        computed: {
            ...mapGetters("model", ["data"]),
            ...mapState("model", ["calculated"]),
            ...mapState("component/canvas", ["nodeStyle", "lineStyle", "displacedNodeStyle", "displacedLineStyle", "backgroundColor"]),
            points() {
                const nodes = this.data.input.nodes;
                return Object.keys(nodes).map((id) => ({
                    props: `size: ${this.nodeStyle.size}; color: ${this.nodeStyle.color}`,
                    pos: `${nodes[id].x} ${nodes[id].y} ${nodes[id].z}`,
                    id
                }));
            },
            lines() {
                const input = this.data.input;
                const lines = input.lines;
                return Object.keys(lines).map((id) => {
                    const n1 = input.nodes[lines[id].n1];
                    const n2 = input.nodes[lines[id].n2];
                    return {
                        props: `start: ${n1.x} ${n1.y} ${n1.z}; end: ${n2.x} ${n2.y} ${n2.z}; color: ${this.lineStyle.color}`,
                        id
                    };
                });
            },
            cones() {
                const input = this.data.input;
                const boundaries = input.boundaries;
                return Object.keys(boundaries).filter((id) => 
                    boundaries[id].x === true && boundaries[id].y === true && boundaries[id].z === true
                ).map((id) => {
                    const node = input.nodes[boundaries[id].node];
                    return {
                        pos: `${node.x} ${node.y} ${node.z - .2}`,
                        id
                    };
                });
            },
            arrows() {
                const input = this.data.input;
                const nodeloads = input.nodeloads;
                return Object.keys(nodeloads).map((id) => {
                    const nodeload = nodeloads[id];
                    const node = input.nodes[nodeload.node];
                    return {
                        pos: `${node.x - nodeload.x} ${node.y - nodeload.y} ${node.z - nodeload.z}`,
                        props: `direction: ${nodeload.x} ${nodeload.y} ${nodeload.z}; color: #888888`,
                        id
                    };
                });
            },
            movedPoints() {
                const nodes = this.data.input.nodes;
                return Object.keys(nodes).map((id) => {
                    const dis = this.data.result.displacements[id] || {};
                    return {
                        props: `size: ${this.displacedNodeStyle.size}; color: ${this.displacedNodeStyle.color}`,
                        pos: `${nodes[id].x + (dis.x || 0)} ${nodes[id].y + (dis.y || 0)} ${nodes[id].z + (dis.z || 0)}`,
                        id
                    };
                });
            },
            movedLines() {
                const input = this.data.input;
                const lines = input.lines;
                const displacements = this.data.result.displacements;
                return Object.keys(lines).map((id) => {
                    const n1 = input.nodes[lines[id].n1];
                    const n2 = input.nodes[lines[id].n2];
                    const dis1 = displacements[lines[id].n1] || {};
                    const dis2 = displacements[lines[id].n2] || {};
                    return {
                        props: `start: ${n1.x + (dis1.x || 0)} ${n1.y + (dis1.y || 0)} ${n1.z + (dis1.z || 0)}; end: ${n2.x + (dis2.x || 0)} ${n2.y + (dis2.y || 0)} ${n2.z + (dis2.z || 0)}; color: ${this.displacedLineStyle.color}`,
                        id
                    };
                });
            }
        }
    };
</script>
