<template>
    <div>
        <h3 class="mdc-typography--subheading2">
            {{title}}
        </h3>
        <component :is="name" />
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
