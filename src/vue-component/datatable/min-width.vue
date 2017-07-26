<template>
    <table>
        <tr>
            <td v-for="content of contents">
                {{content}}
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        props: ["contents"]
    };
</script>

<style scoped>
    table {
        height: 0;
    }
</style>
