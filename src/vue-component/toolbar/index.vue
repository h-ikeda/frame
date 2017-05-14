<template>
    <header class="mdc-toolbar mdc-toolbar--fixed">
        <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <button-menu></button-menu>
                <input-title class="title"></input-title>
            </section>
            <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
                <button-account></button-account>
            </section>
        </div>
    </header>
</template>

<script>
    import menuButton from "./button-menu.vue";
    import accountButton from "./button-account.vue";
    import titleInput from "./input-title.vue";
    export default {
        components: {
            "button-menu": menuButton,
            "button-account": accountButton,
            "input-title": titleInput
        }
    };
</script>

<style scoped>
    .mdc-toolbar__section {
        overflow: visible;
    }
    .title {
        margin-top: 0;
        margin-left: 14px;
        top: -18px;
    }
</style>
