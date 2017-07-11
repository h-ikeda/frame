<template>
    <section class="drawer-header__subtitle">
        <div class="mdc-typography--body2">
            {{username}}
        </div>
        <div class="mdc-typography--body1 drawer-header__email">
            {{email}}
            <i class="material-icons">
                arrow_drop_down
            </i>
        </div>
    </section>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed: {
            ...mapState("account", ["username", "email"])
        }
    };
</script>

<style scoped>
    .drawer-header__subtitle {
        height: 3.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: #fff;
    }
    .drawer-header__email {
        text-align-last: justify;
        cursor: pointer;
    }
    .drawer-header__email .material-icons {
        vertical-align: middle;
    }
</style>
