<template>
    <div class="mdc-typography">
        <frame-toolbar></frame-toolbar>
        <frame-drawer></frame-drawer>
        <main class="mdc-toolbar-fixed-adjust" :style="mainStyle">
            <frame-datatable class="pane1"></frame-datatable>
            <frame-splitter></frame-splitter>
            <frame-canvas :style="pane2style"></frame-canvas>
        </main>
        <frame-fab></frame-fab>
        <frame-dialog></frame-dialog>
    </div>
</template>

<script>
import toolbar from "./components/toolbar/toolbar.vue";
import drawer from "./components/drawer/drawer.vue";
import datatable from "./components/datatable/datatable.vue";
import canvas from "./components/canvas/canvas.vue";
import splitter from "./components/splitter.vue";
import dialog from "./components/dialog/dialog.vue";
import fab from "./components/fab.vue";

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

<style lang="scss">
    @import "~material-components-web/material-components-web";
    body {
        margin: 0;
    }
</style>

<style scoped>
    .mdc-toolbar-fixed-adjust {
        display: flex;
        height: calc(100vh - 64px);
    }
    @media (max-width: 599px) {
        .mdc-toolbar-fixed-adjust {
            height: calc(100vh - 56px);
        }
    }
    .pane1 {
        flex-grow: 1;
    }
</style>
