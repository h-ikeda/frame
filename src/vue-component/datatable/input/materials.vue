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
                        "E",
                        "G"
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
                            item.data.E,
                            item.data.G
                        ],
                        selected: item.selected,
                        toggleSelect: () => {
                            this.toggleSelect(item.id);
                        }
                    };
                });
            },
            ...mapGetters("model/input/materials", ["dataArray", "selectedAll"])
        },
        methods: {
            ...mapActions("model/input/materials", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
