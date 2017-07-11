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
            <t-r v-for="id, index of ids" :key="id" :selected="isSelected(id)" @click.native="toggleSelect(id)">
                <td>
                    <t-checkbox :checked="isSelected(id)" />
                </td>
                <td>{{index}}</td>
                <td>{{items[index].x}}</td>
                <td>{{items[index].y}}</td>
                <td>{{items[index].z}}</td>
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
    import ripple from "../../directives/ripple";

    import prefixed from "prefix-keys";

    export default {
        computed: {
            ...mapState("model/input/nodes", ["ids", "items"]),
            ...mapGetters("model/input/nodes", ["isSelected", "selectedAll"])
        },
        methods: {
            ...mapActions("model/input/nodes", ["toggleSelect", "toggleSelectAll"])
        },
        components: prefixed("t-", {
            r,
            checkbox
        }),
        directives: {
            ripple
        }
    };
</script>
