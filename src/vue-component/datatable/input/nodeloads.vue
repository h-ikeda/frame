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
                        "PX",
                        "PY",
                        "PZ",
                        "MX",
                        "MY",
                        "MZ"
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
            ...mapGetters("model/input/nodeloads", ["dataArray", "selectedAll"]),
            ...mapState("model/input/nodes", {
                nodes: "idArray"
            })
        },
        methods: {
            ...mapActions("model/input/nodeloads", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
