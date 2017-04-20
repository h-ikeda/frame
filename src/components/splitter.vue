<template>
    <div :style="outerStyle" class="display">
        <div :style="innerStyle" class="surface" @mousemove="onMove" @mousedown="onDown" @mouseup="onUp"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buttons: 0
            };
        },
        computed: {
            outerStyle() {
                var thickness = "width";
                var cursor = "col-resize";
                if (this.$store.state.componentStates.splitVertical) {
                    thickness = "height";
                    cursor = "row-resize";
                }
                return {
                    [thickness]: "7px",
                    cursor
                };
            },
            innerStyle() {
                return this.buttons ? {
                    height: "100vh",
                    width: "100vw",
                    position: "fixed",
                    top: 0,
                    left: 0
                }: {};
            }
        },
        methods: {
            onMove(e) {
                if (this.buttons) {
                    this.$store.commit("setSplitPosition",
                        this.$store.state.componentStates.splitVertical ?
                            e.clientY:
                            e.clientX
                    );
                }
            },
            onUp(e) {
                this.buttons &= ~(2 ** e.button);
            },
            onDown(e) {
                this.buttons |= 2 ** e.button;
            }
        }
    };
</script>

<style scoped>
    .display {
        background-color: black;
        display: flex;
    }
    .surface {
        flex-grow: 1;
    }
</style>
