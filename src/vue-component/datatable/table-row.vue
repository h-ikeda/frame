<template>
    <tr :class="cls">
        <slot />
    </tr>
</template>

<script>
    export default {
        props: ["selected"],
        computed: {
            cls() {
                return {
                    "t-selected": this.selected
                };
            }
        }
    };
</script>
