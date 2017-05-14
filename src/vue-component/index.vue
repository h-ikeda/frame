<template>
    <div class="frame-root">
        <frame-toolbar></frame-toolbar>
        <frame-drawer></frame-drawer>
        <main class="mdc-toolbar-fixed-adjust frame-spreadbox-fixed" :style="mainStyle">
            <frame-datatable class="frame-pane1"></frame-datatable>
            <frame-splitter></frame-splitter>
            <frame-canvas :style="pane2style"></frame-canvas>
        </main>
        <frame-fab></frame-fab>
        <frame-dialog></frame-dialog>
    </div>
</template>

<script>
import toolbar from "./toolbar/index.vue";
import drawer from "./drawer/index.vue";
import datatable from "./datatable/index.vue";
import canvas from "./canvas/index.vue";
import splitter from "./splitter/index.vue";
import dialog from "./dialog/index.vue";
import fab from "./fab/index.vue";

export default {
    computed: {
        mainStyle() {
            return this.$store.state.componentStates.splitVertical ? {
                flexDirection: "column"
            }: {};
        },
        pane2style() {
            var p = "width";
            var a = innerWidth;
            if (this.$store.state.componentStates.splitVertical) {
                p = "height";
                a = innerHeight;
            }
            return {
                [p]: a - this.$store.state.componentStates.splitPosition - 3 + "px"
            };
        }
    },
    components: {
        "frame-toolbar": toolbar,
        "frame-drawer": drawer,
        "frame-datatable": datatable,
        "frame-canvas": canvas,
        "frame-splitter": splitter,
        "frame-fab": fab,
        "frame-dialog": dialog
    }
};
</script>

<style scoped>
    .frame-spreadbox-fixed {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        display: flex;
    }
    .frame-pane1 {
        flex-grow: 1;
    }
</style>
