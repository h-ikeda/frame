<template>
    <header class="mdc-toolbar mdc-elevation--z4">
        <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <a href="#" class="material-icons mdc-toolbar__icon--menu" @click="toggleOpen">
                    menu
                </a>
                <span class="mdc-toolbar__title">
                    {{title}}
                </span>
            </section>
            <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
                <a href="#" class="material-icons mdc-toolbar__icon--menu">
                    more_vert
                </a>
            </section>
        </div>
    </header>
</template>

<script>
    import {mapState, mapMutations} from "vuex";
    export default {
        computed: mapState("model", ["title"]),
        methods: mapMutations("component/drawer", ["toggleOpen"])
    };
</script>
