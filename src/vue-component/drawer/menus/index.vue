<template>
    <div class="mdc-list-group">
        <template v-for="item of items">
            <menu-subheader :expanded="item.expanded" @click.native="item.toggle">
                {{item.caption}}
            </menu-subheader>
            <menu-expandable class="menu-group" :expanded="item.expanded">
                <nav class="mdc-list" @click="toggle()">
                    <rippled-list-item v-for="menu of item.children" :key="menu.name" :class="{[selectedClass]: menu.selected}" @click.native="() => {menu.select();}">
                        <i class="material-icons mdc-list-item__start-detail">
                            {{menu.icon}}
                        </i>
                        {{menu.caption}}
                    </rippled-list-item>
                </nav>
            </menu-expandable>
        </template>
        <hr class="mdc-list-divider">
        <nav class="mdc-list menu-group" @click="toggle()">
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
    import {mapState, mapMutations, mapActions} from "vuex";
    // vueコンポーネントのインポート
    import menuSubheader from "./subheader.vue";
    import menuExpandable from "./expandable.vue";
    import rippledListItem from "./rippled-list-item.vue";

    export default {
        props: ["selectedClass"],
        data() {
            const vm = this;
            class MenuItem {
                constructor(opt) {
                    this.id = opt.id;
                    this.icon = opt.icon;
                    this.caption = opt.caption;
                }
                append(...menuItems) {
                    menuItems.forEach((menuItem) => {
                        menuItem.parent = this;
                        if (!this.children) {
                            this.children = [];
                            this.expanded = true;
                        }
                        this.children.push(menuItem);
                    });
                    return this;
                }
                get name() {
                    let parentName = "";
                    if (this.parent) {
                        parentName = this.parent.name + "/";
                    }
                    return parentName + this.id;
                }
                get selected() {
                    return vm.selected === this.name;
                }
                select() {
                    vm.select(this.name);
                }
                toggle() {
                    this.expanded = !this.expanded;
                }
            }
            const input = new MenuItem({
                id: "input",
                caption: "Input"
            }).append(new MenuItem({
                id: "nodes",
                icon: "control_point",
                caption: "Nodes"
            }), new MenuItem({
                id: "lines",
                icon: "timeline",
                caption: "Lines"
            }), new MenuItem({
                id: "sections",
                icon: "crop_square",
                caption: "Sections"
            }), new MenuItem({
                id: "materials",
                icon: "polymer",
                caption: "Materials"
            }), new MenuItem({
                id: "boundaries",
                icon: "change_history",
                caption: "Boundaries"
            }), new MenuItem({
                id: "nodeloads",
                icon: "arrow_downward",
                caption: "Node Loads"
            }));
            const result = new MenuItem({
                id: "result",
                caption: "Result"
            }).append(new MenuItem({
                id: "displacements",
                icon: "control_point_duplicate",
                caption: "Displacements"
            }), new MenuItem({
                id: "reactions",
                icon: "arrow_upward",
                caption: "Reactions"
            }), new MenuItem({
                id: "stresses",
                icon: "open_with",
                caption: "Stresses"
            }));
            return {
                items: [input, result],
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
            ...mapState("model", ["calculated"])
        },
        methods: {
            ...mapMutations("component/datatable", ["select"]),
            ...mapMutations("component/dialog", ["setMode"]),
            ...mapActions("component/drawer", ["toggle"])
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
