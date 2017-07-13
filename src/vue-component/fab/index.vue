<template>
    <button class="mdc-fab material-icons" @click="calculate">
        <span class="mdc-fab__icon">
            navigate_next
        </span>
    </button>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        methods: mapActions("model", ["calculate"])
    };
</script>
