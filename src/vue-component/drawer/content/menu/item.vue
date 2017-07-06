<template>
    <a class="mdc-list-item" :class="cls" :disabled="disabled" href="#">
        <i class="mdc-list-item__start-detail">
            <slot name="icon"  />
        </i>
        <slot />
    </a>
</template>

<script>
    export default {
        props: ["selected", "disabled"],
        computed: {
            cls() {
                return {
                    "mdc-temporary-drawer--selected": this.selected
                };
            }
        }
    };
</script>
