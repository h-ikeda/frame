<template>
    <table>
        <thead>
            <tr>
                <th>
                    <t-checkbox :checked="selectedAll" @click.native="toggleSelectAll" />
                </th>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
        </thead>
        <tbody>
            <t-r v-for="item, index of dataArray" :key="item.id" :selected="item.selected" @click.native="toggleSelect(item.id)">
                <td>
                    <t-checkbox :checked="item.selected" />
                </td>
                <td>{{index}}</td>
                <td>{{item.data.x}}</td>
                <td>{{item.data.y}}</td>
                <td>{{item.data.z}}</td>
            </t-r>
        </tbody>
    </table>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapGetters, mapActions} from "vuex";
    // vueコンポーネントのインポート
    import r from "../table-row.vue";
    import checkbox from "../../checkbox/index.vue";

    import prefixed from "prefix-keys";

    export default {
        computed: {
            ...mapGetters("model/input/nodes", ["dataArray", "selectedAll"])
        },
        methods: {
            ...mapActions("model/input/nodes", ["toggleSelect", "toggleSelectAll"])
        },
        components: prefixed("t-", {
            r,
            checkbox
        })
    };
</script>
