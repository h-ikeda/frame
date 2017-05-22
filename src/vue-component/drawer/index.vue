<template>
    <mu-drawer :open="$store.state.componentStates.drawerOpen" :docked="false" @close="close">
        <mu-list>
            <mu-list-item title="Input" toggleNested>
                <mu-list-item slot="nested" title="Nodes" />
                <mu-list-item slot="nested" title="Lines" />
                <mu-list-item slot="nested" title="Sections" />
                <mu-list-item slot="nested" title="Materials" />
                <mu-list-item slot="nested" title="Boundaries" />
                <mu-list-item slot="nested" title="Node Loads" />
            </mu-list-item>
            <mu-list-item title="Result" toggleNested>
                <mu-list-item slot="nested" title="Displacements" />
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
            close() {
                this.$store.commit("setDrawerOpen", false);
            }
        }
    };
</script>