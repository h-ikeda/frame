<template>
    <nav class="mdc-list-group">
        <d-subheader :expanded="expanded.input" @click.native="expanded.input=!expanded.input">
            Input
        </d-subheader>
        <d-menu-group :expanded="expanded.input">
            <d-menu-item @click.native="sel(['input', 'nodes'])">
                <span slot="icon" class="material-icons">
                    control_point
                </span>
                Nodes
            </d-menu-item>
            <d-menu-item>
                <span slot="icon" class="material-icons">
                    timeline
                </span>
                Lines
            </d-menu-item>
        </d-menu-group>
        <d-subheader :expanded="expanded.result" @click.native="expanded.result=!expanded.result">
            Result
        </d-subheader>
        <d-menu-group :expanded="expanded.result">
            <d-menu-item :disabled="calculated">
                <span slot="icon" class="material-icons">
                    control_point_duplicate
                </span>
                Displacements
            </d-menu-item>
        </d-menu-group>
        <hr class="mdc-list-divider">
        <d-menu-group>
            <d-menu-item @click.native="openSettings">
                <span slot="icon" class="material-icons">
                    settings
                </span>
                Settings
            </d-menu-item>
            <d-menu-item icon="feedback" @click.native="openFeedback">
                Feedback
            </d-menu-item>
        </d-menu-group>
    </nav>
</template>

<script>
    // vuexヘルパー関数のインポート
    import {mapGetters, mapState, mapMutations, mapActions} from "vuex";
    //vueコンポーネントのインポート
    import subheader from "./subheader.vue";
    import menu from "./menu";

    import prefixed from "prefix-keys";

    export default {
        data() {
            return {
                expanded: {
                    input: true,
                    result: false
                }
            };
        },
        computed: {
            ...mapState("component/datatable", ["selected"]),
            ...mapState("model", ["calculated"])
        },
        methods: {
            ...mapMutations("component/datatable", ["select"]),
            ...mapActions("component/drawer", ["close"]),
            select(name) {
                this.select(name);
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
        components: prefixed("d-", {
            subheader,
            ...menu
        })
    };
</script>
