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
                        "Node 1",
                        "Node 2",
                        "Section",
                        "Material"
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
                            this.nodes.indexOf(item.data.n1),
                            this.nodes.indexOf(item.data.n2),
                            this.sections.indexOf(item.data.section),
                            this.materials.indexOf(item.data.material)
                        ],
                        selected: item.selected,
                        toggleSelect: () => {
                            this.toggleSelect(item.id);
                        }
                    };
                });
            },
            ...mapGetters("model/input/lines", ["dataArray", "selectedAll"]),
            ...mapState("model/input", {
                nodes: (state) => state.nodes.idArray,
                sections: (state) => state.sections.idArray,
                materials: (state) => state.materials.idArray
            })
        },
        methods: {
            ...mapActions("model/input/lines", ["toggleSelect", "toggleSelectAll"])
        }
    };
</script>
