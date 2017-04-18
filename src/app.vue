<template>
    <div>
        <frame-toolbar></frame-toolbar>
        <frame-drawer></frame-drawer>
        <main class="mdc-toolbar-fixed-adjust">
            <frame-datatable></frame-datatable>
            <frame-canvas></frame-canvas>
        </main>
        <frame-fab></frame-fab>
        <frame-dialog></frame-dialog>
    </div>
</template>

<script>
import toolbar from "./components/toolbar/toolbar.vue";
import drawer from "./components/drawer/drawer.vue";
import datatable from "./components/datatable.vue";
import canvas from "./components/canvas.vue";
import dialog from "./components/dialog/dialog.vue";
import fab from "./components/fab.vue";

export default {
    components: {
        "frame-toolbar": toolbar,
        "frame-drawer": drawer,
        "frame-datatable": datatable,
        "frame-canvas": canvas,
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
    main {
        display: flex;
    }
    main > * {
        flex: 1;
    }
</style>
