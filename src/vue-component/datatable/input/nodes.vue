<template>
    <table>
        <slot :header="header" :body="body" />
    </table>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from "vuex";
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
                    const vm = this;
                    return {
                        columns: [{
                            get value() {
                                return index;
                            }
                        }, {
                            get value() {
                                return item.data.x;
                            },
                            set value(value) {
                                vm.mergeData({[item.id]: {x: value, y: item.data.y, z: item.data.z}});
                            }
                        }, {
                            get value() {
                                return item.data.y;
                            },
                            set value(value) {
                                vm.mergeData({[item.id]: {x: item.data.x, y: value, z: item.data.z}});
                            }
                        }, {
                            get value() {
                                return item.data.z;
                            },
                            set value(value) {
                                vm.mergeData({[item.id]: {x: item.data.x, y: item.data.y, z: value}});
                            }
                        }],
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
            ...mapMutations("model/input/nodes", ["mergeData"]),
            ...mapActions("model/input/nodes", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
