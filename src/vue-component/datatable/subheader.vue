<template>
    <h2 class="mdc-theme--primary mdc-typography--subheading2">
        {{subhead}}
    </h2>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed: {
            ...mapState("component/datatable", ["selected"]),
            subhead() {
                return this.selected.split("/").map((_, index, self) =>
                    this.$store.getters[self.slice(0, index + 1).join("/") + "/name"]
                ).filter((name) => name).join(" > ");
            }
        }
    };
</script>
