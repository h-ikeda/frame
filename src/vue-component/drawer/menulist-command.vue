<template>
    <section class="mdc-list">
        <a v-for="item in items" class="mdc-list-item" href="javascript:void(0);">
            <i class="material-icons mdc-list-item__start-detail">inbox</i>
            {{item.label}}
        </a>
    </section>
</template>

<script>
    import {ripple} from "material-components-web";
    export default {
        data() {
            return {
                items: [{
                    id: "settings",
                    label: "Settings"
                }, {
                    id: "feedback",
                    label: "Feedback"
                }]
            };
        },
        mounted() {
            this.$el.querySelectorAll(".mdc-list-item").forEach(el => {
                ripple.MDCRipple.attachTo(el);
            });
        }
    };
</script>