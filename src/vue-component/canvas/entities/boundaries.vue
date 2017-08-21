<template>
    <a-entity>
        <a-cone v-for="cone of cones" radius-top="0" radius-bottom=".25" height=".4" rotation="90 0 0" :position="cone.pos" :key="cone.id" />
    </a-entity>
</template>

<script>
    import "aframe";
    import Vue from "vue";
    Vue.config.ignoredElements.push(...[
        "a-entity",
        "a-cone"
    ].filter((el) => Vue.config.ignoredElements.indexOf(el) === -1));

    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapGetters("model/input", {
                nodes: "nodes/data",
                boundaries: "boundaries/data"
            }),
            ...mapState("model/input/boundaries", ["hidden"]),
            cones() {
                return Object.keys(this.boundaries).filter((id) => !this.hidden[id]).filter((id) =>
                    this.boundaries[id].x === true && this.boundaries[id].y === true && this.boundaries[id].z === true
                ).map((id) => {
                    const node = this.nodes[this.boundaries[id].node];
                    return {
                        pos: `${node.x} ${node.y} ${node.z - .2}`,
                        id
                    };
                });
            }
        }
    };
</script>
