<template>
    <a-entity>
        <a-entity v-for="point of movedPoints" :point="point.props" :position="point.pos" :key="point.id" />
    </a-entity>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapState("component/canvas", ["displacedNodeStyle"]),
            ...mapGetters("model", {
                displacements: "result/displacements/data",
                nodes: "input/nodes/data"
            }),
            movedPoints() {
                return Object.keys(this.nodes).map((id) => {
                    const dis = this.displacements[id] || {};
                    return {
                        props: `size: ${this.displacedNodeStyle.size}; color: ${this.displacedNodeStyle.color}`,
                        pos: `${this.nodes[id].x + (dis.x || 0)} ${this.nodes[id].y + (dis.y || 0)} ${this.nodes[id].z + (dis.z || 0)}`,
                        id
                    };
                });
            }
        }
    };
</script>
