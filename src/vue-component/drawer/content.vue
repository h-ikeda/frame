<template>
    <nav class="mdc-list-group">
        <template v-for="group, groupIndex of groups">
            <frame-drawer-subheader @click="toggleExpanded(groupIndex)" :open="expanded[groupIndex]">
                {{displayName(group)}}
            </frame-drawer-subheader>
            <frame-drawer-transition>
                <nav class="mdc-list" v-show="expanded[groupIndex]">
                    <frame-drawer-item  v-for="type of submenus(group)" @click="select(type)" :selected="name === type" :key="type">
                        <i class="material-icons mdc-list-item__start-detail">
                            {{displayIcon(type)}}
                        </i>
                        {{displayName(type)}}
                    </frame-drawer-item>
                </nav>
            </frame-drawer-transition>
        </template>
        <hr class="mdc-list-divider">
        <nav class="mdc-list">
            <frame-drawer-item @click="openSettings">
                <i class="material-icons mdc-list-item__start-detail">
                    settings
                </i>
                Settings
            </frame-drawer-item>
            <frame-drawer-item @click="openFeedback">
                <i class="material-icons mdc-list-item__start-detail">
                    feedback
                </i>
                Feedback
            </frame-drawer-item>
        </nav>
    </nav>
</template>

<script>
    import {mapGetters, mapState, mapMutations, mapActions} from "vuex";
    import transition from "./list-transition.vue";
    import subheader from "./list-subheader.vue";
    import item from "./list-item.vue";
    import prefixed from "prefix-keys";
    export default {
        data() {
            return {
                expanded: [true, false]
            };
        },
        computed: {
            ...mapGetters("model", ["displayIcon", "displayName", "dataTypes"]),
            ...mapState("component/datatable", ["name"]),
            ...mapState("model", ["calculated"]),
            groups() {
                return this.dataTypes.map((type) => type.slice(0, type.indexOf("/"))).filter((type, i, self) => self.indexOf(type) === i);
            }
        },
        methods: {
            ...mapMutations("component/datatable", ["setName"]),
            ...mapActions("component/drawer", ["close"]),
            select(name) {
                this.setName(name);
                this.close();
            },
            openSettings() {
                this.$store.commit("component/dialog/setMode", "settings");
                this.close();
            },
            openFeedback() {
                this.close();
            },
            submenus(group) {
                return this.dataTypes.filter((type) => type.startsWith(group + "/"));
            },
            toggleExpanded(index) {
                this.expanded.splice(index, 1, !this.expanded[index]);
            }
        },
        components: prefixed("frame-drawer-", {
            transition,
            subheader,
            item
        })
    };
</script>
