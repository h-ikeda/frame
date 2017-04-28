<template>
    <div class="mdc-checkbox frame-datatable--checkbox">
        <input type="checkbox" class="mdc-checkbox__native-control">
        <div class="mdc-checkbox__background">
            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
            </svg>
            <div class="mdc-checkbox__mixedmark"></div>
        </div>
    </div>
</template>

<script>
    import {checkbox} from "material-components-web";
    export default {
        data() {
            return {
                instance: null
            };
        },
        mounted() {
            this.instance = new checkbox.MDCCheckbox(this.$el);
        }
    };
</script>

<style scoped>
    .frame-datatable--checkbox {
        vertical-align: middle;
    }
</style>
