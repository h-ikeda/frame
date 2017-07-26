<template>
    <div>
        <t-subheader class="t-subheader" />
        <t-content class="t-content" />
    </div>
</template>

<script>
    //コンポーネントのインポート
    import subheader from "./subheader.vue";
    import content from "./table.vue";

    import prefixed from "prefix-keys";

    export default {
        components: prefixed("t-", {
            subheader,
            content
        })
    };
</script>

<style scoped>
    .t-subheader {
        margin: 0 1.5rem;
        height: 4rem;
        line-height: 4rem;
        white-space: nowrap;
    }
    .t-content {
        height: calc(100% - 4rem);
    }
</style>
