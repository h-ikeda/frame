<template>
    <section class="mdc-list">
        <a v-for="item in items" class="mdc-list-item" :class="selected(item.id)" href="javascript:void(0);">
            <i class="material-icons mdc-list-item__start-detail">inbox</i>
            {{item.label}}
        </a>
    </section>
</template>

<script>
    import {MDCRipple} from "@material/ripple";
    export default {
        data() {
            return {
                items: [{
                    id: "nodes",
                    label: "Nodes"
                }, {
                    id: "lines",
                    label: "Lines"
                }, {
                    id: "sections",
                    label: "Sections"
                }, {
                    id: "materials",
                    label: "Materials"
                }, {
                    id: "boundaries",
                    label: "Boundaries"
                }, {
                    id: "nodeLoads",
                    label: "Node Loads"
                }]
            };
        },
        methods: {
            selected(id) {
                return {
                    "mdc-temporary-drawer--selected": this.$store.state.componentStates.selected === id
                }
            }
        },
        mounted() {
            this.$el.querySelectorAll(".mdc-list-item").forEach(el => {
                MDCRipple.attachTo(el);
            });
        }
    };
</script>