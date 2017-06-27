<template>
    <table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <thead slot="header">
            <tr>
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
            <tr v-for="displacement, id in displacements" :key="id">
                <td>{{indexOf("nodes", id)}}</td>
                <td>{{displacement.x}}</td>
                <td>{{displacement.y}}</td>
                <td>{{displacement.z}}</td>
                <td>{{displacement.rx}}</td>
                <td>{{displacement.ry}}</td>
                <td>{{displacement.rz}}</td>
            </tr>
        </tbody>
    </table>
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
