<template>
    <div>
        <frame-toolbar></frame-toolbar>
        <frame-drawer></frame-drawer>
        <main class="mdc-toolbar-fixed-adjust">
            <frame-datatable></frame-datatable>
            <frame-canvas></frame-canvas>
        </main>
    </div>
</template>

<script>
import toolbar from "./components/toolbar.vue";
import drawer from "./components/drawer.vue";
import datatable from "./components/datatable.vue";
import canvas from "./components/canvas.vue";

export default {
    components: {
        "frame-toolbar": toolbar,
        "frame-drawer": drawer,
        "frame-datatable": datatable,
        "frame-canvas": canvas
    }
};
</script>

<style lang="scss">
    @import "~material-components-web/material-components-web";
</style>
