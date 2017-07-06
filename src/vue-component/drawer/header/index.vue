<template>
    <header :style="stl">
        <div class="mdc-temporary-drawer__header-content">
            <div>
                <frame-avatar :src="avatar" size="3.75rem" />
                <div class="mdc-typography--body2">
                    {{username}}
                </div>
                <div class="mdc-typography--body1">
                    {{email}}
                    <i class="material-icons">
                        arrow_drop_down
                    </i>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapState} from "vuex";
    import defaultAvatar from "./avatar.png";
    import defaultBackgroundImage from "./background.png";
    import avatar from "../../avatar/index.vue";
    import prefixed from "prefix-keys";
    export default {
        data() {
            return {
                avatar: defaultAvatar,
                image: defaultBackgroundImage
            };
        },
        computed: {
            stl() {
                return {
                    backgroundImage: "url(\"" + this.image + "\")"
                };
            },
            ...mapState("account", ["username", "email"])
        },
        components: prefixed("frame-", {avatar})
    };
</script>

<style scoped>
    .mdc-temporary-drawer__header {
        background-size: cover;
        color: #fff;
    }
    i {
        vertical-align: middle;
        cursor: pointer;
    }
</style>
