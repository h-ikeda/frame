<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
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
            <mu-tr v-for="reaction, id in reactions" :key="id">
                <mu-td>{{indexOf("nodes", id)}}</mu-td>
                <mu-td>{{reaction.x}}</mu-td>
                <mu-td>{{reaction.y}}</mu-td>
                <mu-td>{{reaction.z}}</mu-td>
                <mu-td>{{reaction.rx}}</mu-td>
                <mu-td>{{reaction.ry}}</mu-td>
                <mu-td>{{reaction.rz}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/result", ["reactions"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
