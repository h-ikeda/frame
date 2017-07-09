<template>
    <table>
        <thead>
            <tr>
                <th>
                    <t-checkbox :checked="selectedAll" @click.native="toggleSelectAll" />
                </th>
                <th>ID</th>
                <th>Node 1</th>
                <th>Node 2</th>
                <th>Section</th>
                <th>Material</th>
            </tr>
        </thead>
        <tbody>
            <t-r v-for="id, index of ids" :key="id" :selected="isSelected(id)" @click.native="toggleSelect(id)">
                <td>
                    <t-checkbox :checked="isSelected(id)" />
                </td>
                <td>{{index}}</td>
                <td>{{nodes.indexOf(items[index].n1)}}</td>
                <td>{{nodes.indexOf(items[index].n2)}}</td>
                <td>{{sections.indexOf(items[index].section)}}</td>
                <td>{{materials.indexOf(items[index].material)}}</td>
            </t-r>
        </tbody>
    </table>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapState, mapGetters, mapActions} from "vuex";
    // vueコンポーネントのインポート
    import r from "../table-row.vue";
    import checkbox from "../../checkbox/index.vue";

    import prefixed from "prefix-keys";

    export default {
        computed: {
            ...mapState("model/input/lines", ["ids", "items"]),
            ...mapState("model/input", {
                nodes: (state) => state.nodes.ids,
                sections: (state) => state.sections.ids,
                materials: (state) => state.materials.ids
            }),
            ...mapGetters("model/input/lines", ["isSelected", "selectedAll"])
        },
        methods: {
            ...mapActions("model/input/lines", ["toggleSelect", "toggleSelectAll"])
        },
        components: prefixed("t-", {
            r,
            checkbox
        })
    };
</script>
