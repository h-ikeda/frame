<template>
    <mu-appbar :title="$store.state.dataName">
        <mu-icon-button icon="menu" slot="left" @click="$store.commit('setDrawerOpen',true)" />
        <mu-flat-button :label="$store.state.databaseUser ? 'Sign Out': 'Sign In'" slot="right" @click="toggleAuthState" />
    </mu-appbar>
</template>

<script>
    export default {
        methods: {
            drawerOpen() {
                this.$store.commit("setDrawerOpen", true);
            },
            toggleAuthState() {
                const newUser = this.$store.state.databaseUser ? null: {};
                this.$store.commit("setDatabaseUser", newUser);
            }
        }
    };
</script>