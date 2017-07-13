<template>
    <header class="mdc-toolbar">
        <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <a href="#" class="material-icons mdc-toolbar__icon--menu" @click="toggle">
                    menu
                </a>
                <span class="mdc-toolbar__title">
                    {{title}}
                </span>
            </section>
            <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
                <a href="#" class="material-icons mdc-toolbar__icon--menu" @click="submenu">
                    more_vert
                </a>
            </section>
        </div>
    </header>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    export default {
        computed: mapState("model", ["title"]),
        methods: {
            ...mapActions("component/drawer", ["toggle"]),
            submenu() {
                let g = this.$store.state.component.splitGrids + 1;
                if (g > 11) {
                    g = 1;
                }
                this.$store.commit("component/setSplitGrids", g);
            }
        }
    };
</script>
