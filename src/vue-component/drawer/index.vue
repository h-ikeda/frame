<template>
    <aside class="mdc-temporary-drawer" :class="cls" :style="stl">
        <nav class="mdc-temporary-drawer__drawer" ref="drawer" :style="dStl" @transitionend="transitionend">
            <frame-drawer-header class="mdc-temporary-drawer__header" />
            <frame-drawer-content class="mdc-temporary-drawer__content" />
        </nav>
    </aside>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {MDCTemporaryDrawerFoundation} from "@material/drawer";
    import {saveElementTabState, restoreElementTabState} from "@material/drawer/util";
    import prefixed from "prefix-keys";

    // コンポーネントのインポート
    import header from "./header/index.vue";
    import content from "./content/index.vue";

    export default {
        data() {
            return {
                cls: {},
                stl: {},
                dStl: {},
                handlers: []
            };
        },
        computed: {
            ...mapState("component/drawer", ["opened"]),
            foundation() {
                const vm = this;
                return new MDCTemporaryDrawerFoundation({
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$delete(vm.cls, className);
                    },
                    hasClass: (className) => vm.$el.classList.contains(className),
                    addBodyClass(className) {
                        document.body.classList.add(className);
                    },
                    removeBodyClass(className) {
                        document.body.classList.remove(className);
                    },
                    hasNecessaryDom: () => true,
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
                        vm.handlers.push(handler);
                    },
                    deregisterTransitionEndHandler(handler) {
                        vm.handlers.splice(vm.handlers.indexOf(handler), 1);
                    },
                    registerDocumentKeydownHandler(handler) {
                        document.addEventListener("keydown", handler);
                    },
                    deregisterDocumentKeydownHandler(handler) {
                        document.removeEventListener("keydown", handler);
                    },
                    getDrawerWidth: () => vm.$refs.drawer.clientWidth,
                    setTranslateX(value) {
                        vm.$set(vm.dStl, "transform", "translateX(" + value + "px)");
                    },
                    updateCssVariable(value) {
                        vm.$set(vm.stl, "opacity", value);
                    },
                    getFocusableElements() {

                    },
                    saveElementTabState(el) {
                        saveElementTabState(el);
                    },
                    restoreElementTabState(el) {
                        restoreElementTabState(el);
                    },
                    makeElementUntabbable(el) {

                    },
                    isRtl: () => getComputedStyle(vm.$el).getPropertyValue("direction") === "rtl",
                    notifyOpen: vm.open,
                    notifyClose: vm.close,
                    isDrawer: (el) => vm.$el.contains(el)
                });
            }
        },
        methods: {
            ...mapActions("component/drawer", ["open", "close"]),
            transitionend(e) {
                this.handlers.forEach((f) => {
                    f(e);
                });
            }
        },
        watch: {
            opened(opened) {
                this.foundation[opened ? "open": "close"]();
            }
        },
        mounted() {
            this.foundation.init();
        },
        beforeDestroy() {
            this.foundation.destroy();
        },
        components: prefixed("frame-drawer-", {
            header,
            content
        })
    };
</script>
