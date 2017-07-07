<template>
    <nav class="mdc-list" :style="style">
        <slot />
    </nav>
</template>

<script>
    export default {
        props: {
            expanded: {
                default: true
            }
        },
        data() {
            return {
                height: ""
            };
        },
        computed: {
            style() {
                return this.height ? {
                    height: this.expanded ? this.height: 0,
                    transitionDuration: this.expanded ? "0.225s": "0.195s"
                }: {};
            }
        },
        mounted() {
            this.height = getComputedStyle(this.$el).height;
        }
    };
</script>

<style scoped>
    .mdc-list {
        overflow: hidden;
        transition-property: height;
        transition-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
</style>
