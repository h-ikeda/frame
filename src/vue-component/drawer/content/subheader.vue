<template>
    <h3 class="mdc-list-group__subheader">
        <slot />
        <i class="material-icons">
            {{expanded ? "expand_less": "expand_more"}}
        </i>
    </h3>
</template>

<script>
    export default {
        props: ["expanded"]
    };
</script>

<style scoped>
    h3 {
        padding-left: 1rem;
        padding-right: 1rem;
        color: rgba(0, 0, 0, 0.54);
        cursor: pointer;
    }
    i {
        vertical-align: middle;
        float: right;
    }
</style>
