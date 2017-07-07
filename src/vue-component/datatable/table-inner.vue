<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="id, index of ids" :key="id" :class="cls(id)" @click="toggleSelect(id)">
                <td>
                    <frame-checkbox :checked="isSelected(id)" />
                </td>
                <td>{{index}}</td>
                <td>{{items[index].x}}</td>
                <td>{{items[index].y}}</td>
                <td>{{items[index].z}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("component/datatable", ["selected"]),
        }
    };
</script>

<style lang="scss" scoped>
    table {
        border-collapse: collapse;
        color: rgba(0, 0, 0, 0.87);
        text-align: right;
        min-width: 100%;
        white-space: nowrap;
    }
    @import "~@material/typography/mixins";
    thead {
        @include mdc-typography(caption);
    }
    tbody {
        @include mdc-typography(body1);
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
    .frame-table-selected {
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
