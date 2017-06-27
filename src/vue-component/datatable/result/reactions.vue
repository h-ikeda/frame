<template>
    <table>
        <thead>
            <tr>
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
            <tr v-for="reaction, id in reactions" :key="id">
                <td>{{indexOf("nodes", id)}}</td>
                <td>{{reaction.x}}</td>
                <td>{{reaction.y}}</td>
                <td>{{reaction.z}}</td>
                <td>{{reaction.rx}}</td>
                <td>{{reaction.ry}}</td>
                <td>{{reaction.rz}}</td>
            </tr>
        </tbody>
    </table>
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
