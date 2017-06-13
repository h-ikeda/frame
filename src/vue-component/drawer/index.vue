<template>
    <mu-drawer :open="open" :docked="false" @close="toggleOpen">
        <mu-list :value="name" @change="change">
            <mu-list-item title="Input" toggleNested>
                <mu-list-item title="Nodes" value="input/nodes" slot="nested" />
                <mu-list-item title="Lines" value="input/lines" slot="nested" />
                <mu-list-item title="Sections" value="input/sections" slot="nested" />
                <mu-list-item title="Materials" value="input/materials" slot="nested" />
                <mu-list-item title="Boundaries" value="input/boundaries" slot="nested" />
                <mu-list-item title="Node Loads" value="input/nodeloads" slot="nested" />
            </mu-list-item>
            <mu-list-item title="Result" toggleNested>
                <mu-list-item title="Displacements" value="result/displacements" :disabled="!calculated" slot="nested" />
                <mu-list-item title="Reactions" value="result/reactions" :disabled="!calculated" slot="nested" />
                <mu-list-item title="Stresses" value="result/stresses" :disabled="!calculated" slot="nested" />
            </mu-list-item>
            <mu-divider />
            <mu-list-item title="Settings" />
            <mu-list-item title="Feedback" />
        </mu-list>
    </mu-drawer>
</template>

<script>
    import {mapState, mapMutations} from "vuex";
    export default {
        computed: {
            ...mapState("component/drawer", ["open"]),
            ...mapState("component/datatable", ["name"]),
            ...mapState("model", ["calculated"])
        },
        methods: {
            ...mapMutations("component/drawer", ["toggleOpen"]),
            ...mapMutations("component/datatable", ["setName"]),
            change(value) {
                this.setName(value);
                this.toggleOpen();
            }
        }
    };
</script>
