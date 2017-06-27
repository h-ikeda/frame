<template>
    <table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <thead slot="header">
            <tr>
                <th>ID</th>
                <th>Node</th>
                <th>DX</th>
                <th>DY</th>
                <th>DZ</th>
                <th>RX</th>
                <th>RY</th>
                <th>RZ</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="boundary, id in boundaries" :key="id">
                <td>{{indexOf("boundaries", id)}}</td>
                <td>{{indexOf("nodes", boundary.node)}}</td>
                <td>{{boundary.x}}</td>
                <td>{{boundary.y}}</td>
                <td>{{boundary.z}}</td>
                <td>{{boundary.rx}}</td>
                <td>{{boundary.ry}}</td>
                <td>{{boundary.rz}}</td>
            </tr>
        </tbody>
    </table>
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
