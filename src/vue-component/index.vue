<template>
    <div class="mdc-typography">
        <frame-drawer />
        <frame-toolbar />
        <frame-progress v-if="calculating" />
        <main class="frame-main">
            <section>
                <frame-datatable class="frame-main__content" />
            </section>
            <section class="mdc-elevation--z2">
                <frame-canvas />
            </section>
        </main>
        <frame-fab class="frame-fab" />

        <!-- 仮テストボタン　動作確認のために一時的に配置しました。 -->
        <button style="position:fixed;bottom:1rem;right:7.5rem;" @click="test">
            仮
        </button>

    </div>
</template>

<script>
import {mapState} from "vuex";
import toolbar from "./toolbar/index.vue";
import drawer from "./drawer/index.vue";
import datatable from "./datatable/index.vue";
import canvas from "./canvas/index.vue";
import fab from "./fab/index.vue";
import progress from "./progress/index.vue";
import prefixed from "prefix-keys";

export default {
    computed: mapState("model", ["calculating"]),
    methods: {
        test() {
            // !!!Temporary!!! 仮テストボタンの動作をここに記述します。
            this.$store.commit("component/canvas/setLineStyle", {
                color: 0x00ffff
            });
            this.$store.commit("component/canvas/setNodeStyle", {
                color: 0x00ffff
            });
            this.$store.commit("component/canvas/three/toggleCameraMode");
        }
    },
    components: prefixed("frame-", {
        toolbar,
        drawer,
        datatable,
        canvas,
        fab,
        progress
    })
};
</script>

<style>
    @import "~material-design-icons/iconfont/material-icons.css";
    @import "~material-components-web/dist/material-components-web.css";
    body {
        margin: 0;
    }
</style>

<style scoped>
    .frame-main {
        display: flex;
    }
    .frame-main > section {
        flex: 1;
    }
    .frame-fab {
        position: fixed !important;
        right: 1rem;
        bottom: 1rem;
    }
</style>
