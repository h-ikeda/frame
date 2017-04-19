<template>
    <aside class="mdc-dialog">
        <dialog-account v-if="isSignInDialog"></dialog-account>
        <dialog-message v-else :message="'test'"></dialog-message>
        <div class="mdc-dialog__backdrop"></div>
    </aside>
</template>

<script>
    import {MDCDialog} from "@material/dialog";
    import accountDialog from "./dialog-account.vue";
    import messageDialog from "./dialog-message.vue";
    export default {
        data() {
            return {
                instance: null
            }
        },
        computed: {
            isSignInDialog() {
                return this.$store.state.componentStates.dialogMode === "signIn";
            }
        },
        mounted() {
            this.instance = new MDCDialog(this.$el);
            this.$watch("instance.open", open => {
                this.$store.commit("setDialogOpen", open);
            });
            this.$store.watch(({componentStates}) => componentStates.dialogOpen, open => {
                this.instance[open ? "show": "close"]();
            });
        },
        components: {
            "dialog-account": accountDialog,
            "dialog-message": messageDialog
        }
    };
</script>