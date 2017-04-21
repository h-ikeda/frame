<template>
    <label class="mdc-textfield">
        <input type="text" class="mdc-textfield__input" v-model="title">
        <span class="mdc-textfield__label">Document title</span>
    </label>
</template>

<script>
    import {MDCTextfield} from "@material/textfield";
    export default {
        data() {
            return {
                title: ""
            };
        },
        mounted() {
            MDCTextfield.attachTo(this.$el);
        }
    }
</script>

<style scoped lang="scss">
    @import "@material/theme/mixins";
    .mdc-textfield {
        margin-top: 0;
        top: -18px;
    }
    .mdc-textfield__input {
        @include mdc-theme-prop(color, text-primary-on-primary);
    }
    .mdc-textfield__label {
        @include mdc-theme-prop(color, text-hint-on-primary);
    }
    .mdc-textfield__label--float-above {
        @include mdc-theme-prop(color, text-primary-on-primary);
    }
</style>
