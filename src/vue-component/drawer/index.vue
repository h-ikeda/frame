<template>
    <aside class="mdc-temporary-drawer" :class="cls" :style="{opacity}">
        <nav class="mdc-temporary-drawer__drawer" ref="drawer" :style="{transform}" @transitionend="execTeh">
            <header class="mdc-temporary-drawer__header">
                <div class="mdc-temporary-drawer__header-content">
                    <div>
                        <div class="frame-drawer__avatar" :style="avtStyle"></div>
                        <div class="mdc-typography--body2">Sample User</div>
                        <div class="mdc-typography--body1">sample@example.com</div>
                    </div>
                </div>
            </header>
            <nav class="mdc-temporary-drawer__content mdc-list-group">
                <h3 class="mdc-list-group__subheader" @click="inputOpen=!inputOpen">
                    Input
                    <span class="material-icons frame-drawer__expand">
                        {{inputOpen ? "expand_less": "expand_more"}}
                    </span>
                </h3>
                <transition>
                    <nav class="mdc-list" v-show="inputOpen">
                        <a class="mdc-list-item" :class="clsSel('input/nodes')" @click="select('input/nodes')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                control_point
                            </i>
                            Nodes
                        </a>
                        <a class="mdc-list-item" :class="clsSel('input/lines')" @click="select('input/lines')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                timeline
                            </i>
                            Lines
                        </a>
                        <a class="mdc-list-item" :class="clsSel('input/sections')" @click="select('input/sections')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                crop_square
                            </i>
                            Sections
                        </a>
                        <a class="mdc-list-item" :class="clsSel('input/materials')" @click="select('input/materials')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                polymer
                            </i>
                            Materials
                        </a>
                        <a class="mdc-list-item" :class="clsSel('input/boundaries')" @click="select('input/boundaries')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                change_history
                            </i>
                            Boundaries
                        </a>
                        <a class="mdc-list-item" :class="clsSel('input/nodeloads')" @click="select('input/nodeloads')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                arrow_downward
                            </i>
                            Node Loads
                        </a>    
                    </nav>
                </transition>
                <h3 class="mdc-list-group__subheader" @click="resultOpen=!resultOpen">
                    Result
                    <span class="material-icons frame-drawer__expand">
                        {{resultOpen ? "expand_less": "expand_more"}}
                    </span>
                </h3>
                <transition>
                    <nav class="mdc-list" v-show="resultOpen">
                        <a class="mdc-list-item" :class="clsSel('result/displacements')" @click="select('result/displacements')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                control_point_duplicate
                            </i>
                            Displacements
                        </a>
                        <a class="mdc-list-item" :class="clsSel('result/reactions')" @click="select('result/reactions')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                arrow_upward
                            </i>
                            Reactions
                        </a>
                            <a class="mdc-list-item" :class="clsSel('result/stresses')" @click="select('result/stresses')" href="#">
                            <i class="material-icons mdc-list-item__start-detail">
                                open_with
                            </i>
                            Stresses
                        </a>
                    </nav>
                </transition>
                <hr class="mdc-list-divider">
                <nav class="mdc-list">
                    <a class="mdc-list-item" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            settings
                        </i>
                        Settings
                    </a>
                    <a class="mdc-list-item" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            feedback
                        </i>
                        Feedback
                    </a>
                </nav>
            </nav>
        </nav>
    </aside>
</template>

<script>
    import {mapState, mapMutations} from "vuex";
    import {MDCTemporaryDrawerFoundation} from "@material/drawer";
    import * as util from "@material/drawer/util";
    import defaultAvatar from "./avatar.png";
    export default {
        data() {
            return {
                cls: {},
                transform: null,
                opacity: null,
                teh: [],
                inputOpen: true,
                resultOpen: false
            };
        },
        computed: {
            ...mapState("component/drawer", ["open"]),
            ...mapState("component/datatable", ["name"]),
            ...mapState("model", ["calculated"]),
            foundation() {
                const vm = this;
                return new MDCTemporaryDrawerFoundation({
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$delete(vm.cls, className);
                    },
                    hasClass(className) {
                        return className in vm.cls ||
                            className === "mdc-temporary-drawer" ||
                            className === "mdc-typography";
                    },
                    addBodyClass(className) {
                        document.body.classList.add(className);
                    },
                    removeBodyClass(className) {
                        document.body.classList.remove(className);
                    },
                    hasNecessaryDom() {
                        return true;
                    },
                    registerInteractionHandler(evt, handler) {
                        vm.$el.addEventListener(evt, handler);
                    },
                    deregisterInteractionHandler(evt, handler) {
                        vm.$el.removeEventListener(evt, handler);
                    },
                    registerDrawerInteractionHandler(evt, handler) {
                        vm.$refs.drawer.addEventListener(evt, handler);
                    },
                    deregisterDrawerInteractionHandler(evt, handler) {
                        vm.$refs.drawer.removeEventListener(evt, handler);
                    },
                    registerTransitionEndHandler(handler) {
                        vm.teh.push(handler);
                    },
                    deregisterTransitionEndHandler(handler) {
                        vm.teh.splice(vm.teh.indexOf(handler), 1);
                    },
                    registerDocumentKeydownHandler(handler) {
                        document.addEventListener("keydown", handler);
                    },
                    deregisterDocumentKeydownHandler(handler) {
                        document.removeEventListener("keydown", handler);
                    },
                    getDrawerWidth() {
                        return vm.$refs.drawer.clientWidth;
                    },
                    setTranslateX(value) {
                        vm.transform = "translateX(" + value + "px)";
                    },
                    updateCssVariable(value) {
                        vm.opacity = value;
                    },
                    getFocusableElements() {

                    },
                    saveElementTabState(el) {
                        util.saveElementTabState(el);
                    },
                    restoreElementTabState(el) {
                        util.restoreElementTabState(el);
                    },
                    makeElementUntabbable(el) {

                    },
                    isRtl() {
                        return getComputedStyle(vm.$el).getPropertyValue("direction") === "rtl";
                    },
                    notifyOpen() {
                        if (!vm.open) {
                            vm.toggleOpen();
                        }
                    },
                    notifyClose() {
                        if (vm.open) {
                            vm.toggleOpen();
                        }
                    },
                    isDrawer(el) {
                        return vm.$el.contains(el);
                    }
                });
            },
            avtStyle() {
                return {
                    backgroundImage: "url(\"" + defaultAvatar + "\")"
                };
            }
        },
        methods: {
            ...mapMutations("component/drawer", ["toggleOpen"]),
            ...mapMutations("component/datatable", ["setName"]),
            select(name) {
                this.setName(name);
                this.foundation.close();
            },
            clsSel(name) {
                return {
                    "mdc-temporary-drawer--selected": this.name === name
                };
            },
            execTeh(e) {
                this.teh.forEach((f) => {f(e);});
            }
        },
        watch: {
            open(open) {
                this.foundation[open ? "open": "close"]();
            }
        },
        mounted() {
            this.foundation.init();
        },
        beforeDestroy() {
            this.foundation.destroy();
        }
    };
</script>

<style scoped>
    .mdc-temporary-drawer__header {
        background-image: url("background.png");
        background-size: cover;
        color: #fff;
    }
    .frame-drawer__avatar {
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
        position: absolute;
        top: 2.5rem;
        background-size: cover;
    }
    .mdc-list-group__subheader {
        margin-left: 1rem;
        color: rgba(0, 0, 0, 0.54);
        cursor: pointer;
    }
    .frame-drawer__expand {
        vertical-align: middle;
        float: right;
        margin-right: 1rem;
    }
    .v-enter-active {
        transition: max-height 0.225s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }
    .v-enter, .v-leave-to {
        max-height: 0;
    }
    .v-enter-to, .v-leave {
        max-height: 100vh;
    }
    .v-leave-active {
        transition: max-height 0.195s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }
</style>
