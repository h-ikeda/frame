<template>
    <section>
        <img :src="photo">
    </section>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed: {
            ...mapState("account", ["photo"])
        }
    };
</script>

<style scoped>
    img {
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
    }
</style>
