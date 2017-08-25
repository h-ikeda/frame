<template>
    <!--
        <a-circle radius="100" material="color: #666666; opacity:0.5; transparent: true" rotation="-90 0 0" />
    -->
    <v-renderer :style="style" ref="rdr" :alpha="true" :antialias="true">
        <v-scene :rotation="`${-Math.PI * .5} 0 0`">
            <v-nodes />
            <v-lines />
            <!--
            <v-boundaries />
            <v-nodeloads />
            <v-displaced-nodes v-if="calculated" />
            <v-displaced-lines v-if="calculated" />
            -->
            <v-ambient-light color="#bbb" />
            <v-directional-light color="#fff" intensity="0.6" position="-0.5 -1 1" />
        </v-scene>
        <v-perspective-camera target=".5 2 0" orbit="10 1 -.6" />
    </v-renderer>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import {renderer, scene, perspectiveCamera, ambientLight, directionalLight} from "./three";
    import nodes from "./nodes.vue";
    import lines from "./lines.vue";

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
            "v-nodes": nodes,
            "v-lines": lines,
            "v-ambient-light": ambientLight,
            "v-directional-light": directionalLight
        }
    };
</script>
