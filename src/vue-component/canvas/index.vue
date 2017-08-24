<template>
    <!--
    <a-scene embedded>
        <a-entity id="aframe-target" rotation="-90 0 0">
            <a-nodes />
            <a-lines />
            <a-boundaries />
            <a-nodeloads />
            <a-displaced-nodes v-if="calculated" />
            <a-displaced-lines v-if="calculated" />
        </a-entity>
        <a-circle radius="100" material="color: #666666; opacity:0.5; transparent: true" rotation="-90 0 0" />
        <a-sky :color="backgroundColor" />
        <a-camera orbit-controls="target: #aframe-target; enableDamping: true" />
    </a-scene>
    -->
    <v-renderer :alpha="true" :style="style" ref="rdr">
        <v-scene>
            <v-nodes />
        </v-scene>
        <v-perspective-camera target="0 0 0" />
    </v-renderer>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import {renderer, scene, perspectiveCamera} from "./three";
    import nodes from "./nodes.vue";

    export default {
        computed: {
            ...mapState("model", ["calculated"]),
            ...mapState("component/canvas", ["backgroundColor"]),
            style() {
                return {
                    backgroundColor: this.backgroundColor
                };
            }
        },
        methods: {
            resizeHandler() {
                this.$refs.rdr.$emit("resize");
            }
        },
        created() {
            addEventListener("resize", this.resizeHandler);
        },
        mounted() {
            this.resizeHandler();
        },
        beforeDestroy() {
            removeEventListener("resize", this.resizeHandler);
        },
        components: {
            "v-renderer": renderer,
            "v-scene": scene,
            "v-perspective-camera": perspectiveCamera,
            "v-nodes": nodes
        }
    };
</script>
