<template>
    <linear-progress :indeterminate="true" :accent="true" :open="calculating" />
</template>

<script>
    import {mapState} from "vuex";
    import linearProgress from "../mdc-component/linear-progress";
    export default {
        computed: {
            ...mapState("model", ["calculating"])
        },
        components: {
            ...linearProgress
        }
    };
</script>
