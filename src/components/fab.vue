<template>
    <button class="mdc-fab material-icons" @click="calculate">
        <span class="mdc-fab__icon">
            favorite
        </span>
    </button>
</template>

<script>
    import {MDCRipple} from "@material/ripple";
    export default {
        methods: {
            calculate() {
                this.$store.dispatch("calculate");
            }
        },
        mounted() {
            MDCRipple.attachTo(this.$el);
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