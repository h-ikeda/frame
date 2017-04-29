<template>
    <label class="mdc-textfield">
        <input type="text" class="mdc-textfield__input mdc-theme--text-primary-on-primary" v-model="title">
        <span class="mdc-textfield__label mdc-theme--text-hint-on-primary">Document title</span>
    </label>
</template>

<script>
    import {textfield} from "material-components-web";
    export default {
        data() {
            return {
                title: ""
            };
        },
        mounted() {
            textfield.MDCTextfield.attachTo(this.$el);
        }
    }
</script>

<style scoped>
    .mdc-textfield {
        margin-top: 0;
        top: -18px;
    }
    .mdc-textfield__label--float-above {
        color: --mdc-theme-text-primary-on-primary;
    }
</style>
