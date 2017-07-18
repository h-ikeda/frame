<template>
    <component :is="selected" class="t-inner" />
</template>

<script>
    import {mapState} from "vuex";
    import input from "./input";
    import result from "./result";
    import prefixed from "prefix-keys";
    export default {
        computed: {
            ...mapState("component/datatable", ["selected"]),
        },
        components: prefixed("model/", {
            ...input,
            ...result
        })
    };
</script>

<style lang="scss" scoped>
    @import "~@material/typography/mixins";
    .t-inner {
        border-collapse: collapse;
        color: rgba(0, 0, 0, 0.87);
        text-align: right;
        min-width: 100%;
        white-space: nowrap;
    }
    .t-inner /deep/ thead {
        @include mdc-typography(caption);
    }
    .t-inner /deep/ tbody {
        @include mdc-typography(body1);
    }
    .t-inner /deep/ tr {
        height: calc(3rem - 1px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    .t-inner /deep/ thead tr {
        height: calc(3.5rem - 1px);
    }
    .t-inner /deep/ tbody tr:hover {
        background: #eeeeee;
    }
    .t-inner /deep/ .t-selected {
        background: #f5f5f5;
    }
    .t-inner /deep/ th {
        color: rgba(0, 0, 0, 0.54);
    }
    .t-inner /deep/ th, .t-inner /deep/ td {
        padding: 0 0 0 3.5rem;
    }
    .t-inner /deep/ th:nth-child(-n+2), .t-inner /deep/ td:nth-child(-n+2) {
        padding-left: .8125rem;
        width: 1px;
    }
    .t-inner /deep/ th:last-child, .t-inner /deep/ td:last-child {
        padding-right: 1.5rem;
    }
</style>
