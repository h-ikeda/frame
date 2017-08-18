<template>
    <a-entity>
        <a-entity v-for="line of lines" :line="line.props" :key="line.id" />
    </a-entity>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import uuid from "uuid/v4";
    export default {
        computed: {
            ...mapGetters("model/input", {
                lineDatas: "lines/data",
                nodeDatas: "nodes/data"
            }),
            ...mapState("component/canvas", ["lineStyle"]),
            lines() {
                return Object.keys(this.lineDatas).map((id) => {
                    const n1 = this.nodeDatas[this.lineDatas[id].n1];
                    const n2 = this.nodeDatas[this.lineDatas[id].n2];
                    return {
                        props: `start: ${n1.x} ${n1.y} ${n1.z}; end: ${n2.x} ${n2.y} ${n2.z}; color: ${this.lineStyle.color}`,
                        id
                    };
                });
            }
        }
    };
</script>
