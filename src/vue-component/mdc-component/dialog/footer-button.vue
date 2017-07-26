<template>
    <button class="mdc-button mdc-dialog__footer__button" :class="cls">
        <slot />
    </button>
</template>

<script>
    export default {
        props: ["role"],
        computed: {
            cls() {
                return {
                    ["mdc-dialog__footer__button--" + this.role]: true
                };
            }   
        }
    };
</script>
