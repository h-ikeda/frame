<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Node</th>
                <th>PX</th>
                <th>PY</th>
                <th>PZ</th>
                <th>MX</th>
                <th>MY</th>
                <th>MZ</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="nodeload, id in nodeloads" :key="id">
                <td>{{indexOf("nodeloads", id)}}</td>
                <td>{{indexOf("nodes", nodeload.node)}}</td>
                <td>{{nodeload.x}}</td>
                <td>{{nodeload.y}}</td>
                <td>{{nodeload.z}}</td>
                <td>{{nodeload.rx}}</td>
                <td>{{nodeload.ry}}</td>
                <td>{{nodeload.rz}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("model/input", ["nodeloads"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
