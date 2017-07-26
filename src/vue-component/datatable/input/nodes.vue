<template>
    <table>
        <slot :header="header" :body="body" />
    </table>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    export default {
        computed: {
            header() {
                const vm = this;
                return {
                    columns: [
                        "ID",
                        "X",
                        "Y",
                        "Z"
                    ],
                    get selectedAll() {
                        return vm.selectedAll;
                    },
                    set selectedAll(value) {
                        if (value !== vm.selectedAll) {
                            vm.toggleSelectAll();
                        }
                    }
                }
            },
            body() {
                return this.dataArray.map((item, index) => {
                    return {
                        columns: [
                            index,
                            item.data.x,
                            item.data.y,
                            item.data.z
                        ],
                        selected: item.selected,
                        toggleSelect: () => {
                            this.toggleSelect(item.id);
                        }
                    };
                });
            },
            ...mapGetters("model/input/nodes", ["dataArray", "selectedAll"])
        },
        methods: {
            ...mapActions("model/input/nodes", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
