<template>
    <div class="mdc-list-group">
        <template v-for="mdl of modules.children">
            <menu-subheader :expanded="expanded[mdl.id]" @click.native="toggleExpanded(mdl.id)">
                {{mdl.name}}
            </menu-subheader>
            <menu-expandable class="menu-group" :expanded="expanded[mdl.id]">
                <nav class="mdc-list" @click="toggleOpen()">
                    <rippled-list-item v-for="child of mdl.children" :key="child.id" :class="{[selectedClass]: selected === child.id}" @click.native="select(child.id)">
                        <i class="material-icons mdc-list-item__start-detail">
                            {{child.icon}}
                        </i>
                        {{child.name}}
                    </rippled-list-item>
                </nav>
            </menu-expandable>
        </template>
        <hr class="mdc-list-divider">
        <nav class="mdc-list menu-group" @click="toggleOpen()">
            <rippled-list-item v-for="item of commands" :key="item.id" @click.native="item.command">
                <i class="material-icons mdc-list-item__start-detail">
                    {{item.icon}}
                </i>
                {{item.caption}}
            </rippled-list-item>
        </nav>
    </div>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
    // vueコンポーネントのインポート
    import menuSubheader from "./subheader.vue";
    import menuExpandable from "./expandable.vue";
    import rippledListItem from "./rippled-list-item.vue";

    export default {
        props: ["selectedClass"],
        data() {
            const vm = this;
            return {
                commands: [{
                    id: "settings",
                    icon: "settings",
                    caption: "Settings",
                    command() {
                        vm.setMode("settings");
                    }
                }, {
                    id: "feedback",
                    icon: "feedback",
                    caption: "Feedback",
                    command() {
                        vm.setMode("feedback");
                    }
                }]
            };
        },
        computed: {
            ...mapState("component/datatable", ["selected"]),
            ...mapState("component/drawer", ["expanded"]),
            ...mapState("model", ["calculated"]),
            modules() {
                //
                // [{
                //     id: モジュール名
                //     name: モジュールの表示名,
                //     children: [{
                //         id: モジュール名
                //         name: モジュールの表示名
                //     }, {
                //         id: モジュール名
                //         name: モジュールの表示名
                //     }, ...]
                // }, ...]
                //
                const vm = this;
                return (function getModuleInfo(mdl) {
                    const getters = vm.$store.getters;
                    const t = {
                        id: mdl,
                        name: getters[mdl + "/name"],
                        icon: getters[mdl + "/icon"]
                    };
                    const childModules = getters[mdl + "/modules"];
                    if (childModules) {
                        t.children = childModules.map((m) => getModuleInfo(mdl + "/" + m));
                    }
                    return t;
                })("model");
            }
        },
        methods: {
            ...mapMutations("component/datatable", ["select"]),
            ...mapMutations("component/dialog", ["setMode"]),
            ...mapActions("component/drawer", ["toggleOpen", "toggleExpanded"])
        },
        components: {
            "menu-subheader": menuSubheader,
            "menu-expandable": menuExpandable,
            "rippled-list-item": rippledListItem
        }
    };
</script>

<style scoped>
    .menu-group {
        margin-top: .5rem;
        padding-bottom: .5rem;
    }
</style>
