<template>
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
</template>

<script>
    import "aframe";
    import "aframe-point-component";
    import "aframe-arrow-component";
    import "aframe-orbit-controls-component-2";
    import {mapGetters, mapState} from "vuex";
    import components from "./entities";
    export default {
        computed: {
            ...mapState("model", ["calculated"]),
            ...mapState("component/canvas", ["backgroundColor"])
        },
        components
    };
</script>
