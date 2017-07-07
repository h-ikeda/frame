<template>
    <div class="t-wrapper">
        <div class="t-fixed" :class="cls">
            <div class="t-fixed__content">
                <t-inner :style="style" />
            </div>
        </div>
        <div class="t-scrollable" @scroll="scroll">
            <div class="t-scrollable__content">
                <t-inner />
            </div>
        </div>
    </div>
</template>

<script>
    // vueコンポーネントのインポート
    import inner from "./table-inner.vue";

    import prefixed from "prefix-keys";

    export default {
        data() {
            return {
                x: 0,
                y: 0
            };
        },
        computed: {
            style() {
                return {
                    transform: "translateX(" + this.x + "px)"
                };
            },
            cls() {
                return {
                    "mdc-elevation--z1": this.y
                };
            }
        },
        methods: {
            scroll(e) {
                this.x = -e.target.scrollLeft;
                this.y = e.target.scrollTop;
            }
        },
        components: prefixed("t-", {
            inner
        })
    };
</script>

<style lang="scss" scoped>
    .t-wrapper {
        position: relative;
    }
    .t-fixed {
        overflow-y: scroll;
        position: absolute;
        width: 100%;
        height: calc(3.5rem - 1px);
        z-index: 1;
    }
    .t-fixed__content {
        overflow: hidden;
        height: 100%;
        background: #fff;
    }
    .t-scrollable {
        overflow-x: auto;
        overflow-y: scroll;
        position: absolute;
        top: calc(3.5rem - 1px);
        bottom: 0;
        width: 100%;
    }
    .t-scrollable__content {
        margin-top: calc(-3.5rem + 1px);
    }
</style>

