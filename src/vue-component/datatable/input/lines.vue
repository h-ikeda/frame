<template>
    <table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <thead slot="header">
            <tr>
                <th>ID</th>
                <th>Node 1</th>
                <th>Node 2</th>
                <th>Section</th>
                <th>Material</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="line, id in lines" :key="id">
                <td>{{indexOf("lines", id)}}</td>
                <td>{{indexOf("nodes", line.n1)}}</td>
                <td>{{indexOf("nodes", line.n2)}}</td>
                <td>{{indexOf("sections", line.section)}}</td>
                <td>{{indexOf("materials", line.material)}}</td>
            </tr>
        </tbody>
    </table>
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
