<template>
    <a href="javascript:void(0);" @click="signOut" v-if="this.$store.getters.signedIn">Sign Out</a>
    <a href="javascript:void(0);" @click="showSignInDialog" v-else>Sign In</a>
</template>

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
</style>

<script>
    export default {
        methods: {
            showSignInDialog() {
                this.$store.commit("setDialogMode", "signIn");
                this.$store.commit("setDialogOpen", true);
            },
            signOut() {
                this.$store.dispatch("signOut");
            }
        }
    };
</script>