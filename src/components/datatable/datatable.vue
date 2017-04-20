<template>
    <div class="data-table--wrapper">
        <h2 class="mdc-typography--title data-table-header">Table header</h2>
        <div class="data-table--content">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div class="mdc-checkbox">
                                <input type="checkbox" class="mdc-checkbox__native-control">
                                <div class="mdc-checkbox__background">
                                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                        <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                                    </svg>
                                    <div class="mdc-checkbox__mixedmark"></div>
                                </div>
                            </div>
                        </th>
                        <th v-for="item in columns">
                            {{item.label}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, index) in records" :class="{selected: isSelected(index)}" @click="onclick(index)">
                        <td>
                            <div class="mdc-checkbox">
                                <input type="checkbox" class="mdc-checkbox__native-control">
                                <div class="mdc-checkbox__background">
                                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                        <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                                    </svg>
                                    <div class="mdc-checkbox__mixedmark"></div>
                                </div>
                            </div>
                        </td>
                        <td v-for="item in columns">
                            <span contenteditable @input="onchange(index, item.id)" @blur="onchange(index, item.id)">{{record[item.id]}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            onchange(index, id) {
                return e => {
                    this.records[index][id] = e.target.textContent;
                    console.log(this.records[index]);
                };
            },
            onclick(index) {
                this.$store.commit(this.$store.getters.isSelectedRecord(index) ? "unselectRecord": "selectRecord", index);
            },
            isSelected(index) {
                return this.$store.getters.isSelectedRecord(index);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@material/theme/mixins";
    .data-table--wrapper {
        display: flex;
        flex-direction: column;
    }
    .data-table-header {
        font-weight: normal;
        @include mdc-theme-prop(color, primary);
        line-height: 64px;
        margin: 0 24px;
    }
    .data-table--content {
        flex-grow: 1;
        position: relative;
        overflow-y: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        text-align: right;
        padding-right: 56px;
    }
    td span {
        display: block;
    }
    th:first-child, td:first-child {
        padding: 0 13px;
        width: 40px;
    }
    th:last-child, td:last-child {
        padding-right: 24px;
    }
    tr {
        color: rgba(0, 0, 0, .87);
        font-size: .8125rem;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
        height: 48px;
        line-height: 48px;
    }
    td {
        height: 48px;
    }
    thead tr {
        color: rgba(0, 0, 0, .54);
        font-weight: normal;
        font-size: .75rem;
        height: 56px;
        line-height: 56px;
    }
    tbody tr:hover {
        background: #EEEEEE;
    }
    .selected {
        background: #F5F5F5;
    }
</style>
