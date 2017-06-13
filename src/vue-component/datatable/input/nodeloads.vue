<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
                <mu-th>ID</mu-th>
                <mu-th>Node</mu-th>
                <mu-th>PX</mu-th>
                <mu-th>PY</mu-th>
                <mu-th>PZ</mu-th>
                <mu-th>MX</mu-th>
                <mu-th>MY</mu-th>
                <mu-th>MZ</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="nodeload, id in nodeloads" :key="id">
                <mu-td>{{id}}</mu-td>
                <mu-td>{{nodeload.node}}</mu-td>
                <mu-td>{{nodeload.x}}</mu-td>
                <mu-td>{{nodeload.y}}</mu-td>
                <mu-td>{{nodeload.z}}</mu-td>
                <mu-td>{{nodeload.rx}}</mu-td>
                <mu-td>{{nodeload.ry}}</mu-td>
                <mu-td>{{nodeload.rz}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed: mapState("model/input", ["nodeloads"])
    };
</script>
