<template>
    <aside class="mdc-temporary-drawer mdc-typography">
        <nav class="mdc-temporary-drawer__drawer">
            <drawer-menulist></drawer-menulist>
        </nav>
    </aside>
</template>

<script>
    import {MDCTemporaryDrawer} from "@material/drawer";
    import menulist from "./menulist.vue";
    export default {
        data() {
            return {
                instance: null
            }
        },
        mounted() {
            this.instance = new MDCTemporaryDrawer(this.$el);
            this.$watch("instance.open", open => {
                this.$store.commit("setDrawerMenuOpen", open);
            });
            this.$store.watch(({componentStates}) => componentStates.drawerMenuOpen, open => {
                this.instance.open = open;
            });
        },
        components: {
            "drawer-menulist": menulist
        }
    };
</script>