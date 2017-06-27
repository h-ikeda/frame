<template>
    <aside class="mdc-temporary-drawer" :class="cls" :style="{opacity}">
        <nav class="mdc-temporary-drawer__drawer" ref="drawer" :style="{transform}" @transitionend="execTeh">
            <header class="mdc-temporary-drawer__header">
                <div class="mdc-temporary-drawer__header-content">
                    Header
                </div>
            </header>
            <nav class="mdc-temporary-drawer__content mdc-list-group">
                <h3 class="mdc-list-group__subheader">
                    Input
                </h3>
                <nav class="mdc-list">
                    <a class="mdc-list-item" :class="clsSel('input/nodes')" @click="select('input/nodes')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            inbox
                        </i>
                        Nodes
                    </a>
                    <a class="mdc-list-item" :class="clsSel('input/lines')" @click="select('input/lines')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
                        </i>
                        Lines
                    </a>
                    <a class="mdc-list-item" :class="clsSel('input/sections')" @click="select('input/sections')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            inbox
                        </i>
                        Sections
                    </a>
                    <a class="mdc-list-item" :class="clsSel('input/materials')" @click="select('input/materials')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
                        </i>
                        Materials
                    </a>
                    <a class="mdc-list-item" :class="clsSel('input/boundaries')" @click="select('input/boundaries')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            inbox
                        </i>
                        Boundaries
                    </a>
                    <a class="mdc-list-item" :class="clsSel('input/nodeloads')" @click="select('input/nodeloads')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
                        </i>
                        Node Loads
                    </a>
                </nav>
                <h3 class="mdc-list-group__subheader">
                    Result
                </h3>
                <nav class="mdc-list">
                    <a class="mdc-list-item" :class="clsSel('result/displacements')" @click="select('result/displacements')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            inbox
                        </i>
                        Displacements
                    </a>
                    <a class="mdc-list-item" :class="clsSel('result/reactions')" @click="select('result/reactions')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
                        </i>
                        Reactions
                    </a>
                    <a class="mdc-list-item" :class="clsSel('result/stresses')" @click="select('result/stresses')" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
                        </i>
                        Stresses
                    </a>
                </nav>
                <hr class="mdc-list-divider">
                <nav class="mdc-list">
                    <a class="mdc-list-item" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
                        </i>
                        Settings
                    </a>
                    <a class="mdc-list-item" href="#">
                        <i class="material-icons mdc-list-item__start-detail">
                            star
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
    export default {
        data() {
            return {
                cls: {},
                transform: null,
                opacity: null,
                teh: []
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
                this.teh.forEach((f) => {f(e);})
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
    }
</style>
