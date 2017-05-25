<template>
    <div>
        <mu-flexbox orient="vertical" :gutter="0" class="frame-main">
            <mu-flexbox-item grow=0>
                <frame-toolbar />
            </mu-flexbox-item>
            <mu-flexbox-item class="frame-main__content-wrapper">
                <mu-flexbox align="stretch" class="frame-main__content">
                    <mu-flexbox-item class="frame-main__content-wrapper">
                        <mu-flexbox orient="vertical" :gutter="0" class="frame-main__content">
                            <mu-flexbox-item grow=0>
                                <mu-sub-header>{{$store.state.componentStates.datatableSubheader}}</mu-sub-header>
                            </mu-flexbox-item>
                            <mu-flexbox-item class="frame-main__content-wrapper">
                                <frame-datatable class="frame-main__content" />
                            </mu-flexbox-item>
                        </mu-flexbox>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <frame-canvas />
                    </mu-flexbox-item>
                </mu-flexbox>
            </mu-flexbox-item>
        </mu-flexbox>
        <frame-drawer />
        <frame-fab class="frame-fab" />
    </div>
</template>

<script>
import toolbar from "./toolbar/index.vue";
import drawer from "./drawer/index.vue";
import datatable from "./datatable/index.vue";
import canvas from "./canvas/index.vue";
import fab from "./fab/index.vue";

export default {
    components: {
        "frame-toolbar": toolbar,
        "frame-drawer": drawer,
        "frame-datatable": datatable,
        "frame-canvas": canvas,
        "frame-fab": fab
    }
};
</script>

<style>
    @import "~material-design-icons/iconfont/material-icons.css";
    @import "~muse-ui/dist/muse-ui.css";
</style>

<style scoped>
    .frame-main {
        height: 100vh;
    }
    .frame-main__content-wrapper {
        position: relative;
    }
    .frame-main__content {
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .frame-fab {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
    }
</style>
