<template>
    <table>
        <thead class="mdc-typography--caption">
            <tr>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
        </thead>
        <tbody class="mdc-typography--body1">
            <tr v-for="node, id in nodes" :key="id">
                <td>{{indexOf("nodes", id)}}</td>
                <td>{{node.x}}</td>
                <td>{{node.y}}</td>
                <td>{{node.z}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/input", ["nodes"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>

<style scoped>
    table {
        border-collapse: collapse;
        color: rgba(0, 0, 0, 0.87);
        text-align: right;
    }
    tr {
        height: 3rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    thead tr {
        height: 3.5rem;
    }
    th {
        color: rgba(0, 0, 0, 0.54);
    }
    th, td {
        padding-left: 3.5rem;
    }
    th:first-child, td:first-child {
        padding-left: 1.5rem;
    }
    th:last-child, td:last-child {
        padding-right: 1.5rem;
    }
</style>
