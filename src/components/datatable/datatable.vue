<template>
    <div>
        <h2 class="mdc-typography--subheading2">Table header</h2>
        <table>
            <thead>
                <tr>
                    <th v-for="item in columns">
                        {{item.label}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in records" :class="{selected: isSelected(index)}" @click="onclick(index)">
                    <td v-for="item in columns">
                        {{record[item.id]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [{
                    id: "id",
                    label: "ID"
                }, {
                    id: "x",
                    label: "X"
                }, {
                    id: "y",
                    label: "Y"
                }, {
                    id: "z",
                    label: "Z"
                }],
                records: [{
                    id: 0,
                    x: 3,
                    y: 2,
                    z: 0.8
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }]
            };
        },
        methods: {
            onclick(index) {
                this.$store.commit(this.$store.getters.isSelectedRecord(index) ? "unselectRecord": "selectRecord", index);
            },
            isSelected(index) {
                return this.$store.getters.isSelectedRecord(index);
            }
        }
    };
</script>

<style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding-right: 56px;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
        text-align: right;
    }
    th {
        height: 56px;
        font-size: .75rem;
        font-weight: normal;
        color: rgba(0, 0, 0, .54);
    }
    td {
        height: 48px;
        font-size: .8125rem;
        color: rgba(0, 0, 0, .87);
    }
    tr {
        padding-left: 24px;
        padding-right: 24px;
    }
    tbody tr:hover {
        background: #EEEEEE;
    }
    .selected {
        background: #F5F5F5;
    }
</style>
