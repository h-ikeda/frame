<template>
    <button class="mdc-fab material-icons" @click="calculate">
        <span class="mdc-fab__icon">
            navigate_next
        </span>
    </button>
</template>

<script>
    import {ripple} from "material-components-web";
    export default {
        methods: {
            calculate() {
                this.$store.dispatch("calculate");
            }
        },
        mounted() {
            ripple.MDCRipple.attachTo(this.$el);
        }
    };
</script>

<style scoped>
    .mdc-fab {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }
</style>
