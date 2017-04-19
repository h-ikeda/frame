<template>
    <nav class="mdc-temporary-drawer__content mdc-list-group">
        <h3 class="mdc-list-group__subheader" @click="toggleInput">
            Input
            <i class="material-icons">
                {{inputOpen ? "expand_less": "expand_more"}}
            </i>
        </h3>
        <menulist-input v-show="inputOpen"></menulist-input>
        <hr class="mdc-list-divider">
        <h3 class="mdc-list-group__subheader" @click="toggleResult">
            Result
            <i class="material-icons">
                {{resultOpen ? "expand_less": "expand_more"}}
            </i>
        </h3>
        <menulist-result v-show="resultOpen"></menulist-result>
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
        data() {
            return {
                inputOpen: false,
                resultOpen: false
            };
        },
        methods: {
            toggleInput() {
                this.inputOpen = !this.inputOpen;
            },
            toggleResult() {
                this.resultOpen = !this.resultOpen;
            }
        },
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
    .mdc-list-group__subheader {
        cursor: pointer;
    }
    .material-icons {
        vertical-align: middle;
    }
</style>
