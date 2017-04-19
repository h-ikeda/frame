<template>
    <div class="mdc-dialog__surface">
        <header class="mdc-dialog__header">
            <h2 class="mdc-dialog__header__title">Sign In</h2>
        </header>
        <section class="mdc-dialog__body">
            <label class="mdc-textfield">
                <input type="email" class="mdc-textfield__input" v-model="email">
                <span class="mdc-textfield__label">E-mail</span>
            </label><br>
            <label class="mdc-textfield">
                <input type="password" class="mdc-textfield__input" v-model="password">
                <span class="mdc-textfield__label">Password</span>
            </label>
        </section>
        <footer class="mdc-dialog__footer">
            <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Cancel</button>
            <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Sign In</button>
        </footer>
    </div>
</template>

<script>
    import {MDCTextfield} from "@material/textfield";
    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        mounted() {
            this.$el.querySelectorAll(".mdc-textfield").forEach(el => {
                MDCTextfield.attachTo(el);
            });
        }
    };
</script>