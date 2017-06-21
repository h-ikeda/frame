<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
                <mu-th>ID</mu-th>
                <mu-th>E</mu-th>
                <mu-th>G</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="material, id in materials" :key="id">
                <mu-td>{{indexOf("materials", id)}}</mu-td>
                <mu-td>{{material.G}}</mu-td>
                <mu-td>{{material.E}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/input", ["materials"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
