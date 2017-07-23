<template>
    <table>
        <slot :header="header" :body="body" />
    </table>
</template>

<script>
    import {mapState, mapGetters, mapActions} from "vuex";
    export default {
        computed: {
            header() {
                const vm = this;
                return {
                    columns: [
                        "ID",
                        "Node",
                        "DX",
                        "DY",
                        "DZ",
                        "RX",
                        "RY",
                        "RZ"
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
                            this.nodes.indexOf(item.data.node),
                            item.data.x,
                            item.data.y,
                            item.data.z,
                            item.data.rx,
                            item.data.ry,
                            item.data.rz
                        ],
                        selected: item.selected,
                        toggleSelect: () => {
                            this.toggleSelect(item.id);
                        }
                    };
                });
            },
            ...mapGetters("model/input/boundaries", ["dataArray", "selectedAll"]),
            ...mapState("model/input/nodes", {
                nodes: "idArray"
            })
        },
        methods: {
            ...mapActions("model/input/boundaries", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
