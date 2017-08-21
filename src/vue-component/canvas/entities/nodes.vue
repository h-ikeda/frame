<template>
    <a-entity>
        <a-entity v-for="point of points" :point="point.props" :position="point.pos" :key="point.id" />
    </a-entity>
</template>

<script>
    import "aframe";
    import "aframe-point-component";
    import Vue from "vue";
    Vue.config.ignoredElements.push(...[
        "a-entity"
    ].filter((el) => Vue.config.ignoredElements.indexOf(el) === -1));

    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapGetters("model/input/nodes", ["data"]),
            ...mapState("component/canvas", ["nodeStyle"]),
            ...mapState("model/input/nodes", ["hidden"]),
            points() {
                return Object.keys(this.data).filter((id) => !this.hidden[id]).map((id) => ({
                    props: `size: ${this.nodeStyle.size}; color: ${this.nodeStyle.color}`,
                    pos: `${this.data[id].x} ${this.data[id].y} ${this.data[id].z}`,
                    id
                }));
            }
        }
    };
</script>
