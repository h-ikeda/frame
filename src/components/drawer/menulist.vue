<template>
    <nav class="mdc-temporary-drawer__content mdc-list-group">
        <h3 class="mdc-list-group__subheader">Input</h3>
        <menulist-input></menulist-input>
        <hr class="mdc-list-divider">
        <h3 class="mdc-list-group__subheader">Result</h3>
        <menulist-result></menulist-result>
        <div class="menu-spacer"></div>
        <hr class="mdc-list-divider">
        <menulist-command></menulist-command>
    </nav>
</template>

<script>
    import input from "./menulist-input.vue";
    import result from "./menulist-result.vue";
    import command from "./menulist-command.vue";
    export default {
        components: {
            "menulist-input": input,
            "menulist-result": result,
            "menulist-command": command
        }
    };
</script>

<style scoped>
    nav {
        display: flex;
        flex-direction: column;
    }
    .menu-spacer {
        flex-grow: 1;
    }
</style>