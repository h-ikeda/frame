<template>
    <table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <thead slot="header">
            <tr>
                <th>ID</th>
                <th>E</th>
                <th>G</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="material, id in materials" :key="id">
                <td>{{indexOf("materials", id)}}</td>
                <td>{{material.G}}</td>
                <td>{{material.E}}</td>
            </tr>
        </tbody>
    </table>
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
