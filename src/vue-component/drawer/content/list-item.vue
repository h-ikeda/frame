<template>
    <a class="mdc-list-item" :class="cls" @click="onclick" href="#">
        <slot />
    </a>
</template>

<script>
    export default {
        props: ["selected"],
        computed: {
            cls() {
                return {
                    "mdc-temporary-drawer--selected": this.selected
                };
            }
        },
        methods: {
            onclick(e) {
                this.$emit("click", e);
            }
        }
    };
</script>
