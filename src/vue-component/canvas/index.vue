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
    <div :style="style">
        <v-renderer :alpha="true" :width="width" :height="height">
            <v-scene>
                <v-nodes />
            </v-scene>
            <v-camera positionZ="10" />
        </v-renderer>
    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import {renderer, scene, camera} from "./three";
    import nodes from "./nodes.vue";

    export default {
        data() {
            return {
                width: 300,
                height: 150
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
            resize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            }
        },
        created() {
            addEventListener("resize", this.resize);
        },
        mounted() {
            this.resize();
        },
        beforeDestroy() {
            removeEventListener("resize", this.resize);
        },
        components: {
            "v-renderer": renderer,
            "v-scene": scene,
            "v-camera": camera,
            "v-nodes": nodes
        }
    };
</script>
