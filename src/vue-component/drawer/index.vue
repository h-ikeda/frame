<template>
    <mu-drawer :open="$store.state.componentStates.drawerOpen" :docked="false" @close="close">
        <mu-list>
            <mu-list-item title="Input" toggleNested>
                <mu-list-item slot="nested" title="Nodes" @click="displayInputNodesTable" />
                <mu-list-item slot="nested" title="Lines" />
                <mu-list-item slot="nested" title="Sections" />
                <mu-list-item slot="nested" title="Materials" />
                <mu-list-item slot="nested" title="Boundaries" />
                <mu-list-item slot="nested" title="Node Loads" />
            </mu-list-item>
            <mu-list-item title="Result" toggleNested>
                <mu-list-item slot="nested" title="Displacements" @click="displayResultDisplacementsTable" />
                <mu-list-item slot="nested" title="Reactions" />
                <mu-list-item slot="nested" title="Stresses" />
            </mu-list-item>
            <mu-divider />
            <mu-list-item title="Settings" />
            <mu-list-item title="Feedback" />
        </mu-list>
    </mu-drawer>
</template>

<script>
    export default {
        methods: {
            displayInputNodesTable() {
                this.$store.commit("setDatatableSubheader", "Input Nodes");
                this.$store.commit("setDatatableContent", this.$store.state.modeldataInput.nodes);
                this.close();
            },
            displayResultDisplacementsTable() {
                this.$store.commit("setDatatableSubheader", "Result Displacements");
                this.$store.commit("setDatatableContent", this.$store.state.modeldataResult.displacements);
                this.close();
            },
            close() {
                this.$store.commit("setDrawerOpen", false);
            }
        }
    };
</script>