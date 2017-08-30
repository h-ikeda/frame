<template>
    <div class="mdc-typography">
        <!--
            ドロワーメニュー
                this.$store.state.component.drawer.open が truthy のとき、
                メニューが表示される。
        -->
        <frame-drawer />

        <!--
            ツールバー
                常に表示する。
        -->
        <frame-toolbar class="mdc-toolbar--fixed" />

        <!--
            メイン画面
                左側にデータテーブルを表示。
                右側にモデルグラフィックを表示。
                gutterのドラッグで表示幅を1:11～11:1に調整。
                (https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-grid)
        -->
        <main class="frame-main mdc-toolbar-fixed-adjust">
            <frame-datatable class="frame-content" :class="firstContentClass" />
            <frame-canvas class="frame-content" :class="secondContentClass" />
        </main>

        <!--
            プログレスバー
                解析中に表示する。
        -->
        <frame-progress class="mdc-toolbar-fixed-adjust" />

        <!--
            アクションボタン
                解析実行ボタン。
                画面右下に表示。
        -->
        <frame-fab class="frame-fab" />

        <!--
            ダイアログボックス
                this.$store.state.component.dialog.mode の値に対応するダイアログを表示します。
        -->
        <frame-dialog />
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import prefixed from "prefix-keys";

    // コンポーネントのインポート
    import toolbar from "./toolbar/index.vue";
    import drawer from "./drawer/index.vue";
    import datatable from "./datatable/index.vue";
    import canvas from "./canvas/index.vue";
    import fab from "./fab/index.vue";
    import progress from "./progress/index.vue";
    import dialog from "./dialog/index.vue";

    export default {
        computed: {
            ...mapState("component", ["splitGrids"]),
            ...mapState("component/dialog", ["mode"]),
            firstContentClass() {
                return {
                    "frame-content--p0": true,
                    ["frame-content--w" + this.splitGrids]: true
                };
            },
            secondContentClass() {
                return {
                    ["frame-content--p" + this.splitGrids]: true,
                    ["frame-content--w" + (12 - this.splitGrids)]: true
                };
            }
        },
        components: {
            ...prefixed("frame-", {
                toolbar,
                drawer,
                datatable,
                canvas,
                fab,
                progress,
                dialog
            })
        }
    };
</script>

<style>
    @import "~material-design-icons/iconfont/material-icons.css";
    @import "~material-components-web/dist/material-components-web.css";
    body {
        margin: 0;
    }
</style>

<style lang="scss" scoped>
    .frame-main {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .frame-content {
        position: absolute;
        top: 0;
        bottom: 0;
        transition: width 0.375s cubic-bezier(0.4, 0.0, 0.2, 1),left 0.375s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    @for $gridWidth from 1 through 12 {
        .frame-content--w#{$gridWidth} {
            width: percentage($gridWidth / 12);
        }
    }
    @for $gridPosition from 0 through 11 {
        .frame-content--p#{$gridPosition} {
            left: percentage($gridPosition / 12);
        }
    }
    .frame-fab {
        position: fixed !important;
        right: 1rem;
        bottom: 1rem;
    }
</style>
