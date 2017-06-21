<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
                <mu-th>ID</mu-th>
                <mu-th>Node</mu-th>
                <mu-th>DX</mu-th>
                <mu-th>DY</mu-th>
                <mu-th>DZ</mu-th>
                <mu-th>RX</mu-th>
                <mu-th>RY</mu-th>
                <mu-th>RZ</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="boundary, id in boundaries" :key="id">
                <mu-td>{{indexOf("boundaries", id)}}</mu-td>
                <mu-td>{{indexOf("nodes", boundary.node)}}</mu-td>
                <mu-td>{{boundary.x}}</mu-td>
                <mu-td>{{boundary.y}}</mu-td>
                <mu-td>{{boundary.z}}</mu-td>
                <mu-td>{{boundary.rx}}</mu-td>
                <mu-td>{{boundary.ry}}</mu-td>
                <mu-td>{{boundary.rz}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/input", ["boundaries"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
