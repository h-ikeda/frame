<template>
    <mu-float-button icon="navigate_next" @click="calculate" secondary />
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        methods: mapActions("model", ["calculate"])
    };
</script>
