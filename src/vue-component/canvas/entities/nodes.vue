<template>
    <a-entity>
        <a-entity v-for="point of points" :point="point.props" :position="point.pos" :key="point.id" />
    </a-entity>
</template>

<script>
    import "aframe-point-component";
    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapGetters("model/input/nodes", ["data"]),
            ...mapState("component/canvas", ["nodeStyle"]),
            points() {
                return Object.keys(this.data).map((id) => ({
                    props: `size: ${this.nodeStyle.size}; color: ${this.nodeStyle.color}`,
                    pos: `${this.data[id].x} ${this.data[id].y} ${this.data[id].z}`,
                    id
                }));
            }
        }
    };
</script>
