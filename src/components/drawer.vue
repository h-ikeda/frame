<template>
    <aside class="mdc-temporary-drawer mdc-typography">
        <nav class="mdc-temporary-drawer__drawer">
            <header class="mdc-temporary-drawer__header">
                <div class="mdc-temporary-drawer__header-content">
                    Header here
                </div>
            </header>
            <nav id="icon-with-text-demo" class="mdc-temporary-drawer__content mdc-list">
                <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
                    <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
                </a>
                <a class="mdc-list-item" href="#">
                    <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
                </a>
            </nav>
        </nav>
    </aside>
</template>

<script>
    import {MDCTemporaryDrawer} from "@material/drawer";
    export default {
        data() {
            return {
                drawer: null
            };
        },
        mounted() {
            this.drawer = new MDCTemporaryDrawer(this.$el);
            this.$store.watch(() => this.$store.state.menuOpen, (value) => {
                this.drawer.open = value;
            });
            this.$store.watch(() => this.drawer.open, (value) => {
                this.$store.dispatch(value ? "openMenu": "closeMenu");
            });
        }
    };
</script>