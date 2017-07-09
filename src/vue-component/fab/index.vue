<template>
    <button v-ripple class="mdc-fab material-icons" @click="calculate">
        <span class="mdc-fab__icon">
            navigate_next
        </span>
    </button>
</template>

<script>
    import {mapActions} from "vuex";
    import ripple from "../directives/ripple";
    export default {
        methods: mapActions("model", ["calculate"]),
        directives: {
            ripple
        }
    };
</script>
