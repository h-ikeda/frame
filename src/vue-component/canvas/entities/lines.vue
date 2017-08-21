<template>
    <a-entity>
        <template v-for="line of lines">
            <a-entity v-if="line.section.shape === `H`" :position="line.origin" :rotation="line.rotation" :key="line.id">
                <a-box :width="line.section.B" :height="line.section.tf" :depth="line.length" :position="`0 ${(line.section.H - line.section.tf) * .5} ${line.length * .5}`" :color="lineStyle.color" />
                <a-box :width="line.section.tw" :height="line.section.H - line.section.tf * 2" :depth="line.length" :position="`0 0 ${line.length * .5}`" :color="lineStyle.color" />
                <a-box :width="line.section.B" :height="line.section.tf" :depth="line.length" :position="`0 ${(line.section.tf - line.section.H) * .5} ${line.length * .5}`" :color="lineStyle.color" />
            </a-entity>
            <a-entity v-else :line="`start: ${line.origin}; end: ${line.end}; color: ${lineStyle.color}`" :key="line.id" />
        </template>
    </a-entity>
</template>

<script>
    import "aframe";
    import Vue from "vue";
    Vue.config.ignoredElements.push(...[
        "a-entity",
        "a-box"
    ].filter((el) => Vue.config.ignoredElements.indexOf(el) === -1));

    import {mapGetters, mapState} from "vuex";
    import uuid from "uuid/v4";
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
                    return {
                        section: this.sectionDatas[this.lineDatas[id].section],
                        length: Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z),
                        origin: `${n1.x} ${n1.y} ${n1.z}`,
                        end: `${n2.x} ${n2.y} ${n2.z}`,
                        rotation: `0 0 0`,
                        id
                    };
                });
            }
        }
    };
</script>
