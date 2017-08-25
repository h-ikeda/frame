<template>
    <v-group>
        <v-mesh-standard-material name="line-standard-material" :color="lineStyle.color" />
        <v-line-basic-material name="line-line-material" :color="lineStyle.color" />
        <template v-for="line of lines">
            <v-group v-if="line.section.shape === 'H'" :position="line.origin" :rotation="line.rotation" :key="line.id">
                <v-box-buffer-geometry name="line-flg-geometry" :width="line.section.B" :height="line.section.tf" :depth="line.length" />
                <v-mesh :position="`0 ${(line.section.H - line.section.tf) * .5} ${line.length * .5}`" material="line-standard-material" geometry="line-flg-geometry" />
                <v-mesh :position="`0 ${(line.section.tf - line.section.H) * .5} ${line.length * .5}`" material="line-standard-material" geometry="line-flg-geometry" />
                <v-box-buffer-geometry name="line-web-geometry" :width="line.section.tw" :height="line.section.H - line.section.tf * 2" :depth="line.length" />
                <v-mesh :position="`0 0 ${line.length * .5}`" material="line-standard-material" geometry="line-web-geometry" />
            </v-group>
            <v-group v-else :key="line.id">
                <v-buffer-attribute name="line-attribute" :array="`${line.origin} ${line.end}`" />
                <v-buffer-geometry name="line-geometry" attribute="position: line-attribute" />
                <v-line material="line-line-material" geometry="line-geometry" />
            </v-group>
        </template>
    </v-group>
</template>

<script>
    import {boxBufferGeometry, group, mesh, meshStandardMaterial, lineBasicMaterial, bufferGeometry, bufferAttribute, line} from "./three";
    import {Vector3} from "three";
    import {mapGetters, mapState} from "vuex";
    export default {
        computed: {
            ...mapGetters("model/input", {
                lineDatas: "lines/data",
                nodeDatas: "nodes/data",
                sectionDatas: "sections/data"
            }),
            ...mapState("component/canvas", ["lineStyle"]),
            ...mapState("model/input/lines", ["hidden"]),
            lines() {
                return Object.keys(this.lineDatas).filter((id) => !this.hidden[id]).map((id) => {
                    const n1 = this.nodeDatas[this.lineDatas[id].n1];
                    const n2 = this.nodeDatas[this.lineDatas[id].n2];
                    const direction = new Vector3(n2.x - n1.x, n2.y - n1.y, n2.z - n1.z);
                    return {
                        section: this.sectionDatas[this.lineDatas[id].section],
                        length: Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z),
                        origin: `${n1.x} ${n1.y} ${n1.z}`,
                        end: `${n2.x} ${n2.y} ${n2.z}`,
                        rotation: `${new Vector3(0, 0, 1).angleTo(direction)} 0 ${!direction.x && !direction.y ? 0: (direction.x < 0 ? -1: 1) * new Vector3(0, -1, 0).angleTo(direction.clone().setZ(0))} ZYX`,
                        id
                    };
                });
            }
        },
        components: {
            "v-group": group,
            "v-mesh": mesh,
            "v-mesh-standard-material": meshStandardMaterial,
            "v-box-buffer-geometry": boxBufferGeometry,
            "v-line-basic-material": lineBasicMaterial,
            "v-buffer-geometry": bufferGeometry,
            "v-buffer-attribute": bufferAttribute,
            "v-line": line
        }
    };
</script>
