<template>
    <div class="drawer-header__wrapper">
        <header-avatar />
        <header-subtitle />
    </div>
</template>

<script>
    import headerAvatar from "./avatar.vue";
    import headerSubtitle from "./subtitle.vue";
    export default {
        components: {
            "header-avatar": headerAvatar,
            "header-subtitle": headerSubtitle
        }
    };
</script>

<style scoped>
    .drawer-header__wrapper {
        width: 100%;
    }
</style>
