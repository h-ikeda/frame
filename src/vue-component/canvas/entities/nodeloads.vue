<template>
    <a-entity>
        <a-entity v-for="arrow of arrows" :position="arrow.pos" :arrow="arrow.props" :key="arrow.id" />
    </a-entity>
</template>

<script>
    import {mapGetters} from "vuex";
    export default {
        computed: {
            ...mapGetters("model/input", {
                nodes: "nodes/data",
                nodeloads: "nodeloads/data"
            }),
            arrows() {
                return Object.keys(this.nodeloads).map((id) => {
                    const nodeload = this.nodeloads[id];
                    const node = this.nodes[nodeload.node];
                    return {
                        pos: `${node.x - nodeload.x} ${node.y - nodeload.y} ${node.z - nodeload.z}`,
                        props: `direction: ${nodeload.x} ${nodeload.y} ${nodeload.z}; color: #888888`,
                        id
                    };
                });
            }
        }
    };
</script>
