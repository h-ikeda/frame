<template>
    <component :is="selected">
        <template scope="data">
            <column-header :header="data.header" />
            <table-content :data="data.body" />
        </template>
    </component>
</template>

<script>
    import {mapState} from "vuex";
    import columnHeader from "./column-header.vue";
    import tableContent from "./table-content.vue";
    import input from "./input";
    import result from "./result";
    import prefixed from "prefix-keys";
    export default {
        computed: {
            ...mapState("component/datatable", ["selected"]),
        },
        components: {
            ...prefixed("model/", {
                ...input,
                ...result
            }),
            "column-header": columnHeader,
            "table-content": tableContent
        }
    };
</script>

<style scoped>
    table {
        border-collapse: collapse;
        color: rgba(0, 0, 0, 0.87);
        text-align: right;
        min-width: 100%;
        white-space: nowrap;
    }
</style>
