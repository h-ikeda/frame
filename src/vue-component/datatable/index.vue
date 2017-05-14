<template>
    <div class="frame-datatable">
        <h2 class="mdc-typography--title frame-datatable__header mdc-theme--primary">Table header</h2>
        <div class="frame-datatable__content">
            <table class="frame-datatable__table">
                <thead>
                    <tr class="frame-datatable__header-row">
                        <td>
                            <datatable-checkbox></datatable-checkbox>
                        </td>
                        <td v-for="item in columns">
                            {{item.label}}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, index) in records" :class="{selected: isSelected(index)}" @click="onclick(index)" class="frame-datatable__body-row">
                        <td>
                            <datatable-checkbox></datatable-checkbox>
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
    import checkbox from "./checkbox.vue";
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
        },
        components: {
            "datatable-checkbox": checkbox
        }
    };
</script>

<style scoped lang="scss">
    .frame-datatable {
        display: flex;
        flex-direction: column;
    }
    .frame-datatable__header {
        font-weight: normal;
        line-height: 64px;
        margin: 0 24px;
    }
    .frame-datatable__content {
        flex-grow: 1;
        position: relative;
        overflow-y: auto;
    }
    .frame-datatable__table {
        width: 100%;
        border-collapse: collapse;
    }
    td {
        text-align: right;
        padding-right: 56px;
    }
    td span {
        display: block;
        outline: none;
    }
    td span:focus {
        border-bottom-color: --mdc-theme-primary;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }
    td:first-child {
        padding: 0 13px;
        width: 40px;
    }
    td:last-child {
        padding-right: 24px;
    }
    .frame-datatable__header-row, .frame-datatable__body-row {
        border-bottom: 1px solid rgba(0, 0, 0, .12);
        color: rgba(0, 0, 0, .87);
        font-size: .8125rem;
        height: 48px;
    }
    .frame-datatable__header-row {
        color: rgba(0, 0, 0, .54);
        font-size: .75rem;
        height: 56px;
    }
    .frame-datatable__body-row:hover {
        background: #EEEEEE;
    }
    .selected {
        background: #F5F5F5;
    }
</style>
