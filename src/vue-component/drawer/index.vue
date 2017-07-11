<template>
    <temporary-drawer v-model="drawerOpen">
        <temporary-drawer-header>
            <temporary-drawer-header-content :style="headerStyle">
                <header-content />
            </temporary-drawer-header-content>
        </temporary-drawer-header>
        <temporary-drawer-content>
            <template scope="props">
                <drawer-menus :selectedClass="props.selectedClass" />
            </template>
        </temporary-drawer-content>
    </temporary-drawer>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapState, mapActions} from "vuex";

    // vueコンポーネントのインポート
    import mdcTemporaryDrawer from "../mdc-component/drawer/temporary";

    // リソースのインポート
    import headerContent from "./header/index.vue";
    import drawerMenus from "./menus/index.vue";

    function url(content) {
        return "url(" + content + ")";
    }

    export default {
        computed: {
            ...mapState("component/drawer", ["open", "bgImg"]),
            drawerOpen: {
                get() {
                    return this.open;
                },
                set(open) {
                    this.toggle(open);
                }
            },
            headerStyle() {
                return {
                    background: url(this.bgImg),
                    backgroundSize: "cover"
                };
            }
        },
        methods: {
            ...mapActions("component/drawer", ["toggle"])
        },
        components: {
            ...mdcTemporaryDrawer,
            "header-content": headerContent,
            "drawer-menus": drawerMenus
        }
    };
</script>
