<template>
    <a href="javascript:void(0);" class="material-icons" @click="onclick">menu</a>
</template>

<style scoped>
    material-icons {
        text-decoration: none;
        color: inherit;
    }
</style>

<script>
    export default {
        methods: {
            onclick() {
                this.$store.commit("setDrawerMenuOpen", true);
            }
        }
    };
</script>
