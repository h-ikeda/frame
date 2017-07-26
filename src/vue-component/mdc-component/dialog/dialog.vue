<template>
    <aside class="mdc-dialog" :class="cls" :style="style" @click="handleEvent">
        <div class="mdc-dialog__surface" @click="handleSurfaceEvent" @transitionend="handleSurfaceEvent">
            <slot />
        </div>
        <div class="mdc-dialog__backdrop"></div>
    </aside>
</template>

<script>
    import {MDCDialogFoundation} from "@material/dialog";
    
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
            event: "close"
        },
        props: ["open"],
        data() {
            return {
                cls: {},
                style: {},
                eventHandlers: {},
                surfaceEventHandlers: {}
            };
        },
        methods: {
            handleEvent(e) {
                callHandlers(this.eventHandlers[e.type], e);
            },
            handleSurfaceEvent(e) {
                callHandlers(this.surfaceEventHandlers[e.type], e);
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

                return new MDCDialogFoundation({
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$set(vm.cls, className, false);
                    },
                    setStyle(propertyName, value) {
                        vm.$set(vm.style, propertyName, value);
                    },
                    addBodyClass(className) {
                        document.body.classList.add(className);
                    },
                    removeBodyClass(className) {
                        document.body.classList.remove(className);
                    },
                    eventTargetHasClass(target, className) {
                        return target.classList.contains(className);
                    },
                    registerInteractionHandler(evt, handler) {
                        if (![
                            "click"
                        ].some((type) => evt === type)) {
                            throw "Cannot handle " + evt + " event.";
                        }
                        registerHandler(vm.eventHandlers, evt, handler);
                    },
                    deregisterInteractionHandler(evt, handler) {
                        vm.eventHandlers[evt].splice(vm.eventHandlers[evt].indexOf(handler), 1);
                    },
                    registerSurfaceInteractionHandler(evt, handler) {
                        if (![
                            "click",
                            "transitionend"
                        ].some((type) => evt === type)) {
                            throw "Cannot handle " + evt + " event.";
                        }
                        registerHandler(vm.surfaceEventHandlers, evt, handler); 
                    },
                    deregisterSurfaceInteractionHandler(evt, handler) {
                        vm.surfaceEventHandlers[evt].splice(vm.surfaceEventHandlers[evt].indexOf(handler), 1);
                    },
                    registerDocumentKeydownHandler(handler) {
                        addEventListener("keydown", handler);
                    },
                    deregisterDocumentKeydownHandler(handler) {
                        removeEventListener("keydown", handler);
                    },
                    registerTransitionEndHandler(handler) {
                        this.registerSurfaceInteractionHandler("transitionend", handler);
                    },
                    deregisterTransitionEndHandler(handler) {
                        this.deregisterSurfaceInteractionHandler("transitionend", handler);
                    },
                    notifyAccept() {
                        unwatch();
                        vm.$emit("accept");
                        vm.$emit("close", false);
                        unwatch = watchOpen();
                    },
                    notifyCancel() {
                        unwatch();
                        vm.$emit("cancel");
                        vm.$emit("close", false);
                        unwatch = watchOpen();
                    },
                    isDialog(el) {
                        return vm.$el.contains(el);
                    },
                    trapFocusOnSurface() {
                        
                    },
                    untrapFocusOnSurface() {
                        
                    }
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
