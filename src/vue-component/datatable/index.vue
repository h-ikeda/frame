<template>
    <div>
        <h2 class="frame-table-subheader mdc-theme--primary mdc-typography--subheading2">
            {{title}}
        </h2>
        <div class="frame-table">
            <div class="frame-table__fixed" :class="cls">
                <div class="frame-table__fixed-inner">
                    <component :is="selected.join('-')" :style="style" />
                </div>
            </div>
            <div class="frame-table__scrollable" @scroll="scroll">
                <div class="frame-table__scrollable-inner">
                    <component :is="selected.join('-')" selectedClassName="frame-table-selected" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import prefixed from "prefix-keys";

    //コンポーネントのインポート
    import input from "./input";
    import result from "./result";

    export default {
        data() {
            return {
                x: 0,
                y: 0
            };
        },
        computed: {
            ...mapState("component/datatable", ["selected"]),
            ...mapGetters("model/result", {
                resultDisplay: "displayName"
            }),
            title() {
                const modelState = this.$store.state.model;
                const [c, m] = this.selected;
                return modelState[c].caption + " > " + modelState[c][m].caption;
            },
            style() {
                return {
                    transform: "translateX(" + this.x + "px)"
                };
            },
            cls() {
                return {
                    "mdc-elevation--z1": this.y
                };
            }
        },
        methods: {
            scroll(e) {
                this.x = -e.target.scrollLeft;
                this.y = e.target.scrollTop;
            }
        },
        components: {
            ...prefixed("input-", input),
            ...prefixed("result-", result)
        }
    };
</script>

<style lang="scss" scoped>
    .frame-table-subheader {
        margin: 0 1.5rem;
        height: 4rem;
        line-height: 4rem;
        white-space: nowrap;
    }
    .frame-table {
        height: calc(100% - 4rem);
        position: relative;
    }
    .frame-table__fixed {
        overflow-y: scroll;
        position: absolute;
        width: 100%;
        height: calc(3.5rem - 1px);
        z-index: 1;
    }
    .frame-table__fixed-inner {
        overflow: hidden;
        height: 100%;
        background: #fff;
    }
    .frame-table__scrollable {
        overflow-x: auto;
        overflow-y: scroll;
        position: absolute;
        top: calc(3.5rem - 1px);
        bottom: 0;
        width: 100%;
    }
    .frame-table__scrollable-inner {
        margin-top: calc(-3.5rem + 1px);
    }
    /*
        /deep/ 演算子により、子コンポーネントにもスタイルが適用される。
    */
    .frame-table /deep/ table {
        border-collapse: collapse;
        color: rgba(0, 0, 0, 0.87);
        text-align: right;
        min-width: 100%;
        white-space: nowrap;
    }
    @import "~@material/typography/mixins";
    .frame-table /deep/ thead {
        @include mdc-typography(caption);
    }
    .frame-table /deep/ tbody {
        @include mdc-typography(body1);
    }
    .frame-table /deep/ tr {
        height: calc(3rem - 1px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    .frame-table /deep/ thead tr {
        height: calc(3.5rem - 1px);
    }
    .frame-table /deep/ tbody tr:hover {
        background: #eeeeee;
    }
    .frame-table /deep/ .frame-table-selected {
        background: #f5f5f5;
    }
    .frame-table /deep/ th {
        color: rgba(0, 0, 0, 0.54);
    }
    .frame-table /deep/ th, .frame-table /deep/ td {
        padding: 0 0 0 3.5rem;
    }
    .frame-table /deep/ th:nth-child(-n+2), .frame-table /deep/ td:nth-child(-n+2) {
        padding-left: .8125rem;
        width: 1px;
    }
    .frame-table /deep/ th:last-child, .frame-table /deep/ td:last-child {
        padding-right: 1.5rem;
    }
</style>
