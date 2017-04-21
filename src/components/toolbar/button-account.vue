<template>
    <a href="javascript:void(0);" class="mdc-typography--subheading1" @click="toggleAuthState">
        {{caption}}
    </a>
</template>

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
</style>

<script>
    export default {
        computed: {
            caption() {
                return this.$store.getters.signedIn ? "Sign Out": "Sign In";
            }
        },
        methods: {
            toggleAuthState() {
                if (this.$store.getters.signedIn) {
                    this.$store.dispatch("signOut");
                } else {
                    this.$store.commit("setDialogMode", "signIn");
                    this.$store.commit("setDialogOpen", true);
                }
            }
        }
    };
</script>
