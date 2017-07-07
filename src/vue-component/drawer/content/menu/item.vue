<template>
    <a v-ripple="disabled" class="mdc-list-item" :class="cls" href="#" :style="disabled ? {backgroundColor: '#ff00ff'}: {}">
        <i class="mdc-list-item__start-detail">
            <slot name="icon" />
        </i>
        <slot />
    </a>
</template>

<script>
    import ripple from "../../../directives/ripple";

    export default {
        props: ["selected", "disabled"],
        computed: {
            cls() {
                return {
                    "mdc-temporary-drawer--selected": this.selected
                };
            }
        },
        directives: {
            ripple
        }
    };
</script>
