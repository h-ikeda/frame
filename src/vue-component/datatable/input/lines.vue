<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
                <mu-th>ID</mu-th>
                <mu-th>Node 1</mu-th>
                <mu-th>Node 2</mu-th>
                <mu-th>Section</mu-th>
                <mu-th>Material</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="line, id in lines" :key="id">
                <mu-td>{{indexOf("lines", id)}}</mu-td>
                <mu-td>{{indexOf("nodes", line.n1)}}</mu-td>
                <mu-td>{{indexOf("nodes", line.n2)}}</mu-td>
                <mu-td>{{indexOf("sections", line.section)}}</mu-td>
                <mu-td>{{indexOf("materials", line.material)}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/input", ["lines"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
