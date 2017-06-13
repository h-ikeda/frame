<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
                <mu-th>ID</mu-th>
                <mu-th>X</mu-th>
                <mu-th>Y</mu-th>
                <mu-th>Z</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="node, id in nodes" :key="id">
                <mu-td>{{id}}</mu-td>
                <mu-td>{{node.x}}</mu-td>
                <mu-td>{{node.y}}</mu-td>
                <mu-td>{{node.z}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed: mapState("model/input", ["nodes"])
    };
</script>
