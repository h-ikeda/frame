<template>
    <header class="mdc-toolbar mdc-toolbar--fixed">
        <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <div class="mdc-button" v-on:click="openMenu">
                    <i class="material-icons">menu</i>
                </div>
                <span class="mdc-toolbar__title">Title</span>
            </section>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .mdc-button {
        color: inherit;
    }
</style>

<script>
    export default {
        methods: {
            openMenu(event) {
                this.$store.dispatch("openMenu");
            }
        }
    };
</script>