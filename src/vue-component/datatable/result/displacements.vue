<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
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
            <mu-tr v-for="displacement, id in displacements" :key="id">
                <mu-td>{{indexOf("nodes", id)}}</mu-td>
                <mu-td>{{displacement.x}}</mu-td>
                <mu-td>{{displacement.y}}</mu-td>
                <mu-td>{{displacement.z}}</mu-td>
                <mu-td>{{displacement.rx}}</mu-td>
                <mu-td>{{displacement.ry}}</mu-td>
                <mu-td>{{displacement.rz}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/result", ["displacements"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
