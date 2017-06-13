<template>
    <component :is="name" />
</template>

<script>
    import {mapState} from "vuex";
    import input from "./input";
    import result from "./result";
    import prefixed from "prefix-keys";

    export default {
        computed: mapState("component/datatable", ["name"]),
        components: {
            ...prefixed("input/", input),
            ...prefixed("result/", result)
        }
    };
</script>
