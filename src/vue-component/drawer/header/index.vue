<template>
    <header :style="{backgroundImage: imgUrl}">
        <div class="mdc-temporary-drawer__header-content">
            <div>
                <f-avatar :src="avatar" size="3.75rem" />
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
    // vuexヘルパー関数のインポート
    import {mapState} from "vuex";
    // vueコンポーネントのインポート
    import avatar from "../../avatar/index.vue";
    //リソースの読み込み
    import defaultAvatar from "./avatar.png";
    import defaultBackgroundImage from "./background.png";

    import prefixed from "prefix-keys";

    export default {
        data() {
            return {
                avatar: defaultAvatar,
                image: defaultBackgroundImage
            };
        },
        computed: {
            ...mapState("account", ["username", "email"]),
            imgUrl() {
                return "url(\"" + this.image + "\")";
            }
        },
        components: prefixed("f-", {
            avatar
        })
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
