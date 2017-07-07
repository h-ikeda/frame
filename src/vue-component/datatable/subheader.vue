<template>
    <h2 class="mdc-theme--primary mdc-typography--subheading2">
        {{caption(selected, " > ")}}
    </h2>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        computed: {
            ...mapState("component/datatable", ["selected"]),
            ...mapGetters("model", ["caption"])
        }
    };
</script>
