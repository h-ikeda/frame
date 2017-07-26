<template>
    <thead class="mdc-typography--caption">
        <tr>
            <th>
                <mdc-checkbox :checked="checked" @change="select" />
            </th>
            <th v-for="column of columns">
                {{column}}
            </th>
        </tr>
    </thead>
</template>

<script>
    import mdcCheckbox from "../mdc-component/checkbox";
    export default {
        props: ["columns", "checked"],
        methods: {
            select(e) {
                this.$emit("change", e);
            }
        },
        components: {
            ...mdcCheckbox
        }
    };
</script>

<style scoped>
    tr {
        height: calc(3.5rem - 1px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    th {
        padding: 0 0 0 3.5rem;
        color: rgba(0, 0, 0, 0.54);
    }
    th:nth-child(-n+2) {
        padding-left: .8125rem;
        width: 1px;
    }
    th:last-child {
        padding-right: 1.5rem;
    }
</style>
