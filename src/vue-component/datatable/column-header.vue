<template>
    <thead class="mdc-typography--caption">
        <tr class="column-header__row">
            <th class="column-header__cell">
                <mdc-checkbox :checked="checked" @change="select" />
            </th>
            <th class="column-header__cell" v-for="column of columns">
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
    .column-header__row {
        height: calc(3.5rem - 1px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    .column-header__cell {
        padding: 0 0 0 3.5rem;
        color: rgba(0, 0, 0, 0.54);
    }
    .column-header__cell:nth-child(-n+2) {
        padding-left: .8125rem;
        width: 1px;
    }
    .column-header__cell:last-child {
        padding-right: 1.5rem;
    }
</style>
