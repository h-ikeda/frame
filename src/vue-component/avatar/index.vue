<template>
    <img :src="src" :style="stl">
</template>

<script>
    export default {
        props: ["src", "size"],
        computed: {
            stl() {
                return {
                    width: this.size,
                    height: this.size
                };
            }
        }
    };
</script>

<style scoped>
    img {
        border-radius: 50%;
    }
</style>
