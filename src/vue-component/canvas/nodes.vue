<template>
    <v-group>
        <v-points-material name="node-material" :size="nodeStyle.size" :color="nodeStyle.color" />
        <v-buffer-attribute name="node-attribute" array="0 0 0" />
        <v-buffer-geometry name="node-geometry" attribute="position: node-attribute" />
        <v-points v-for="point of points" :position="`${point.x} ${point.y} ${point.z}`" material="node-material" geometry="node-geometry" :key="point.id" />
    </v-group>
</template>

<script>
    import {points, pointsMaterial, group, bufferGeometry, bufferAttribute} from "./three";
    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapGetters("model/input/nodes", ["data"]),
            ...mapState("component/canvas", ["nodeStyle"]),
            ...mapState("model/input/nodes", ["hidden"]),
            points() {
                return Object.keys(this.data).filter((id) => !this.hidden[id]).map((id) => ({
                    id,
                    x: this.data[id].x,
                    y: this.data[id].y,
                    z: this.data[id].z
                }));
            }
        },
        components: {
            "v-group": group,
            "v-points": points,
            "v-points-material": pointsMaterial,
            "v-buffer-geometry": bufferGeometry,
            "v-buffer-attribute": bufferAttribute
        }
    };
</script>
