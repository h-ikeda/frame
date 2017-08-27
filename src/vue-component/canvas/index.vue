<template>
    <!--
        <a-circle radius="100" material="color: #666666; opacity:0.5; transparent: true" rotation="-90 0 0" />
    -->
    <v-renderer :style="style" ref="rdr" :alpha="true" :antialias="true" @mousedown.native="start" @mousemove.native="move" @mouseup.native="end">
        <v-scene :rotation="-Math.PI * .5">
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
        <v-perspective-camera target=".5 2 0" :orbit="orbit" />
    </v-renderer>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import {renderer, scene, perspectiveCamera, ambientLight, directionalLight} from "./three";
    import nodes from "./nodes.vue";
    import lines from "./lines.vue";

    export default {
        data() {
            return {
                evt: null,
                orbit: {
                    radius: 10,
                    phi: 1,
                    theta: -0.6
                }
            };
        },
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
            },
            start(evt) {
                this.evt = evt;
            },
            move(evt) {
                if (this.evt) {
                    const deltaX = evt.clientX - this.evt.clientX;
                    const deltaY = evt.clientY - this.evt.clientY;
                    this.orbit.theta -= deltaX * .05;
                    this.orbit.phi -= deltaY * .05;
                    this.evt = evt;
                }
            },
            end(evt) {
                this.evt = null;
            }
        },
        created() {
            addEventListener("resize", this.resizeHandler);
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
