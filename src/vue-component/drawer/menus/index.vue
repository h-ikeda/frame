<template>
    <div class="mdc-list-group">
        <template v-for="item of items">
            <drawer-menu-subheader :expanded="item.expanded" @click.native="inv(item)">
                {{item.caption}}
            </drawer-menu-subheader>
            <nav class="mdc-list" :class="{'--collapsed': !item.expanded}">
                <a v-for="menu of item.menus" class="mdc-list-item" :class="{[selectedClass]: selected===key(item, menu)}" @click="select(key(item, menu))" href="#">
                    <i class="material-icons mdc-list-item__start-detail">
                        {{menu.icon}}
                    </i>
                    {{menu.caption}}
                </a>
            </nav>
        </template>
        <hr class="mdc-list-divider">
        <nav class="mdc-list">
            <a v-for="item of commands" class="mdc-list-item" @click="item.command" href="#">
                <i class="material-icons mdc-list-item__start-detail">
                    {{item.icon}}
                </i>
                {{item.caption}}
            </a>
        </nav>
    </div>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapGetters, mapState, mapMutations, mapActions} from "vuex";
    //vueコンポーネントのインポート
    import drawerMenuSubheader from "./subheader.vue";

    export default {
        props: ["selectedClass"],
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
            ...mapState("model", ["calculated"]),
            itemHeight() {
                const t = document.createElement("li");
                t.classList.add("mdc-list-item");
                return t.clientHeight;
            }
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
        components: {
            "drawer-menu-subheader": drawerMenuSubheader
        }
    };
</script>

<style scoped>
    .--collapsed {
        transition: all 1s ease;
        height: 0;
        overflow: hidden;
    }
</style>
