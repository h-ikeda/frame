<template>
    <tbody class="mdc-typography--body1">
        <tr v-for="item of data" :class="{selected: item.selected}" @click="item.toggleSelect">
            <td>
                <mdc-checkbox :checked="item.selected" />
            </td>
            <td v-for="value of item.columns">{{value}}</td>
        </tr>
    </tbody>
</template>

<script>
    import mdcCheckbox from "../mdc-component/checkbox";
    export default {
        props: ["data"],
        components: {
            ...mdcCheckbox
        }
    };
</script>

<style scoped>
    tr {
        height: calc(3rem - 1px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    tr:hover {
        background: #eeeeee;
    }
    .selected {
        background: #f5f5f5;
    }
    td {
        padding: 0 0 0 3.5rem;
    }
    td:nth-child(-n+2) {
        padding-left: .8125rem;
        width: 1px;
    }
    td:last-child {
        padding-right: 1.5rem;
    }
</style>
