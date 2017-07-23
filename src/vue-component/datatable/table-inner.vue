<template>
    <component :is="selected">
        <template scope="data">
            <thead class="mdc-typography--caption">
                <tr>
                    <th>
                        <mdc-checkbox v-model="data.header.selectedAll" />
                    </th>
                    <th v-for="column of data.header.columns">{{column}}</th>
                </tr>
            </thead>
            <tbody class="mdc-typography--body1">
                <tr v-for="item of data.body" :class="{selected: item.selected}" @click="item.toggleSelect">
                    <td>
                        <mdc-checkbox :checked="item.selected" />
                    </td>
                    <td v-for="value of item.columns">{{value}}</td>
                </tr>
            </tbody>
        </template>
    </component>
</template>

<script>
    import {mapState} from "vuex";
    import mdcCheckbox from "../mdc-component/checkbox";
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
            ...mdcCheckbox
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
    tr {
        height: calc(3rem - 1px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    thead tr {
        height: calc(3.5rem - 1px);
    }
    tbody tr:hover {
        background: #eeeeee;
    }
    .selected {
        background: #f5f5f5;
    }
    th {
        color: rgba(0, 0, 0, 0.54);
    }
    th, td {
        padding: 0 0 0 3.5rem;
    }
    th:nth-child(-n+2), td:nth-child(-n+2) {
        padding-left: .8125rem;
        width: 1px;
    }
    th:last-child, td:last-child {
        padding-right: 1.5rem;
    }
</style>
