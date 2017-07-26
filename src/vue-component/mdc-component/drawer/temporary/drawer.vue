<template>
    <aside :class="classNames" :style="style" @click="handleEvent" @touchmove="handleEvent" @touchend="handleEvent">
        <nav class="mdc-temporary-drawer__drawer" :style="drawerStyle" ref="drawer" @click="handleDrawerEvent" @touchstart="handleDrawerEvent" @transitionend="handleDrawerEvent">
            <slot />
        </nav>
    </aside>
</template>

<script>
    import {MDCTemporaryDrawerFoundation} from "@material/drawer";
    import {saveElementTabState, restoreElementTabState} from "@material/drawer/util";

    function callHandlers(handlers, event) {
        if (handlers) {
            handlers.forEach((handler) => {
                handler(event);
            });
        }
    }

    export default {
        model: {
            prop: "open",
            event: "toggle"
        },
        props: ["open"],
        data() {
            return {
                classNames: {
                    "mdc-temporary-drawer": true
                },
                style: {},
                drawerStyle: {},
                eventHandlers: {},
                drawerEventHandlers: {}
            };
        },
        methods: {
            handleEvent(e) {
                callHandlers(this.eventHandlers[e.type], e);
            },
            handleDrawerEvent(e) {
                callHandlers(this.drawerEventHandlers[e.type], e);
            }
        },
        computed: {
            foundation() {
                const vm = this;

                function registerHandler(handlers, evt, handler) {
                    if (handlers[evt]) {
                        handlers[evt].push(handler);
                    } else {
                        vm.$set(handlers, evt, [handler]);
                    }
                }

                function watchOpen() {
                    return vm.$watch("open", (value) => {
                        vm.foundation[value ? "open": "close"]();
                    });
                }

                let unwatch = watchOpen();

                return new MDCTemporaryDrawerFoundation({
                    addClass(className) {
                        vm.$set(vm.classNames, className, true);
                    },
                    removeClass(className) {
                        vm.$set(vm.classNames, className, false);
                    },
                    hasClass: (className) => vm.$el && vm.$el.classList.contains(className),
                    addBodyClass(className) {
                        document.body.classList.add(className);
                    },
                    removeBodyClass(className) {
                        document.body.classList.remove(className);
                    },
                    hasNecessaryDom: () => vm.$refs.drawer,
                    registerInteractionHandler(evt, handler) {
                        if (![
                            "click",
                            "touchmove",
                            "touchend"
                        ].some((type) => evt === type)) {
                            throw "Cannot handle " + evt + " event.";
                        }
                        registerHandler(vm.eventHandlers, evt, handler);
                    },
                    deregisterInteractionHandler(evt, handler) {
                        vm.eventHandlers[evt].splice(vm.eventHandlers[evt].indexOf(handler), 1);
                    },
                    registerDrawerInteractionHandler(evt, handler) {
                        if (![
                            "click",
                            "touchstart",
                            "transitionend"
                        ].some((type) => evt === type)) {
                            throw "Cannot handle " + evt + " event.";
                        }
                        registerHandler(vm.drawerEventHandlers, evt, handler); 
                    },
                    deregisterDrawerInteractionHandler(evt, handler) {
                        vm.drawerEventHandlers[evt].splice(vm.drawerEventHandlers[evt].indexOf(handler), 1);
                    },
                    registerTransitionEndHandler(handler) {
                        this.registerDrawerInteractionHandler("transitionend", handler);
                    },
                    deregisterTransitionEndHandler(handler) {
                        this.deregisterDrawerInteractionHandler("transitionend", handler);
                    },
                    registerDocumentKeydownHandler(handler) {
                        document.addEventListener("keydown", handler);
                    },
                    deregisterDocumentKeydownHandler(handler) {
                        document.removeEventListener("keydown", handler);
                    },
                    getDrawerWidth: () => vm.$refs.drawer.clientWidth,
                    setTranslateX(value) {
                        vm.$set(vm.drawerStyle, "transform", "translateX(" + value + "px)");
                    },
                    updateCssVariable(value) {
                        vm.$set(vm.style, "opacity", value);
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
                    isRtl: () => vm.$el && getComputedStyle(vm.$el).direction === "rtl",
                    notifyOpen() {
                        unwatch();
                        vm.$emit("toggle", true);
                        unwatch = watchOpen();
                    },
                    notifyClose() {
                        unwatch();
                        vm.$emit("toggle", false);
                        unwatch = watchOpen();
                    },
                    isDrawer: (el) => vm.$el && vm.$el.contains(el)
                });
            }
        },
        mounted() {
            this.foundation.init();
            if (this.open) {
                this.foundation.open();
            }
        },
        beforeDestroy() {
            this.foundation.destroy();
        }
    };
</script>
