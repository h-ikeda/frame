<template>
    <nav class="mdc-list-group" @click="close">
        <template v-for="item of items">
            <d-menu-subheader :expanded="item.expanded" @click.native.stop="inv(item)">
                {{item.caption}}
            </d-menu-subheader>
            <d-menu-group :expanded="item.expanded">
                <d-menu-item v-for="menu of item.menus" :key="key(item, menu)" :disabled="menu.disabled" :selected="selected===key(item, menu)" @click.native="select(key(item, menu))">
                    <span slot="icon" class="material-icons">
                        {{menu.icon}}
                    </span>
                    {{menu.caption}}
                </d-menu-item>
            </d-menu-group>
        </template>
        <hr class="mdc-list-divider">
        <d-menu-group>
            <d-menu-item v-for="item of commands" :key="key(item)" @click.native="item.command">
                <span slot="icon" class="material-icons">
                    {{item.icon}}
                </span>
                {{item.caption}}
            </d-menu-item>
        </d-menu-group>
    </nav>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapGetters, mapState, mapMutations, mapActions} from "vuex";
    //vueコンポーネントのインポート
    import menu from "./menu";

    import prefixed from "prefix-keys";

    export default {
        data() {
            const vm = this;
            return {
                items: [{
                    id: "input",
                    caption: "Input",
                    expanded: true,
                    menus: [{
                        id: "nodes",
                        icon: "control_point",
                        caption: "Nodes"
                    }, {
                        id: "lines",
                        icon: "timeline",
                        caption: "Lines"
                    }, {
                        id: "sections",
                        icon: "crop_square",
                        caption: "Sections"
                    }, {
                        id: "materials",
                        icon: "polymer",
                        caption: "Materials"
                    }, {
                        id: "boundaries",
                        icon: "change_history",
                        caption: "Boundaries"
                    }, {
                        id: "nodeloads",
                        icon: "arrow_downward",
                        caption: "Node Loads"
                    }]
                }, {
                    id: "result",
                    caption: "Result",
                    expanded: false,
                    menus: [{
                        id: "displacements",
                        icon: "control_point_duplicate",
                        caption: "Displacements",
                        get disabled() {
                            return !vm.calculated
                        }
                    }, {
                        id: "reactions",
                        icon: "arrow_upward",
                        caption: "Reactions",
                        get disabled() {
                            return !vm.calculated
                        }
                    }, {
                        id: "stresses",
                        icon: "open_with",
                        caption: "Stresses",
                        get disabled() {
                            return !vm.calculated
                        }
                    }]
                }],
                commands: [{
                    id: "settings",
                    icon: "settings",
                    caption: "Settings",
                    command: vm.settings
                }, {
                    id: "feedback",
                    icon: "feedback",
                    caption: "Feedback",
                    command: vm.feedback
                }]
            };
        },
        computed: {
            ...mapState("component/datatable", ["selected"]),
            ...mapState("model", ["calculated"])
        },
        methods: {
            ...mapMutations("component/datatable", ["select"]),
            ...mapMutations("component/dialog", ["setMode"]),
            ...mapActions("component/drawer", ["close"]),
            settings() {
                this.setMode("settings");
            },
            feedback() {
                this.setMode("feedback");
            },
            inv(item) {
                item.expanded = !item.expanded;
            },
            key() {
                return [...arguments].map((a) => a.id).join("/");
            }
        },
        components: prefixed("d-", menu)
    };
</script>
