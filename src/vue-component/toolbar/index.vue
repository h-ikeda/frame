<template>
    <mu-appbar :title="title">
        <mu-icon-button icon="menu" @click="toggleOpen" slot="left" />
        <mu-flat-button label="Sign In" slot="right" />
    </mu-appbar>
</template>

<script>
    import {mapState, mapMutations} from "vuex";
    export default {
        computed: mapState("model", ["title"]),
        methods: mapMutations("component/drawer", ["toggleOpen"])
    };
</script>
