<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="node, id in nodes" :key="id" :class="{[selectedClassName]: selected}">
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
        props: ["selectedClassName"],
        computed: {
            ...mapState("model/input", ["nodes"]),
            ...mapGetters("model/input", ["indexOf"])
        }
    };
</script>
