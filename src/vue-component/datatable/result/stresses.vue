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
                        "Line",
                        "N (i)",
                        "Qy (i)",
                        "Qz (i)",
                        "My (i)",
                        "Mz (i)",
                        "N (j)",
                        "Qy (j)",
                        "Qz (j)",
                        "My (j)",
                        "Mz (j)"
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
                return this.dataArray.map((item) => {
                    return {
                        columns: [
                            this.lines.indexOf(item.id),
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
            ...mapGetters("model/result/stresses", ["dataArray", "selectedAll"]),
            ...mapState("model/input/lines", {
                lines: "idArray"
            })
        },
        methods: {
            ...mapActions("model/result/stresses", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
