<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="id, index of ids" :key="id" :class="cls(id)" @click="toggleSelect(id)">
                <td>
                    <frame-checkbox :checked="isSelected(id)" />
                </td>
                <td>{{index}}</td>
                <td>{{items[index].x}}</td>
                <td>{{items[index].y}}</td>
                <td>{{items[index].z}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {mapState, mapGetters, mapActions} from "vuex";
    import checkbox from "../../checkbox/index.vue";
    import prefixed from "prefix-keys";
    export default {
        props: ["selectedClassName"],
        computed: {
            ...mapState("model/input/nodes", ["ids", "items"]),
            ...mapGetters("model/input/nodes", ["isSelected"])
        },
        methods: {
            cls(id) {
                return this.selectedClassName ? {
                    [this.selectedClassName]: this.isSelected(id)
                }: {};
            },
            ...mapActions("model/input/nodes", ["toggleSelect"])
        },
        components: prefixed("frame-", {
            checkbox
        })
    };
</script>
