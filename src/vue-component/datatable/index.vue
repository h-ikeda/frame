<template>
    <div frame-datatable>
        <h3 class="mdc-typography--subheading2 mdc-theme--primary mdc-elevation--z1 frame-datatable__subheader">
            {{title}}
        </h3>
        <component :is="name" class="frame-datatable__table" />
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import input from "./input";
    import result from "./result";
    import prefixed from "prefix-keys";

    export default {
        computed: {
            ...mapState("component/datatable", ["name"]),
            ...mapGetters("model/input", {
                inputDisplay: "displayName"
            }),
            ...mapGetters("model/result", {
                resultDisplay: "displayName"
            }),
            title() {
                const [category, type] = this.name.split("/");
                if (process.env.NODE_ENV !== "production" && category !== "input" && category !== "result") {
                    throw "Unexpected model name " + this.name;
                }
                return category[0].toUpperCase() + category.slice(1) + " > " + this[category + "Display"](type);
            }
        },
        components: {
            ...prefixed("input/", input),
            ...prefixed("result/", result)
        }
    };
</script>

<style scoped>
    .frame-datatable__subheader {
        height: 3rem;
        line-height: 3rem;
        margin: 0;
        padding: 0;
        padding-left: 1rem;
    }
    .frame-datatable {
        position: relative;
    }
</style>
