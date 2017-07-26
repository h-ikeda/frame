<template>
    <a href="#" class="mdc-list-item" :class="cls" :style="style"
        @touchstart="handleEvent"
        @pointerdown="handleEvent"
        @mousedown="handleEvent"
        @keydown="handleEvent"
        @focus="handleEvent"
        @touchend="handleEvent"
        @pointerup="handleEvent"
        @mouseup="handleEvent"
        @keyup="handleEvent"
        @blur="handleEvent"
    >
        <slot />
    </a>
</template>

<script>
    import {MDCRippleFoundation} from "@material/ripple";
    import {supportsCssVariables} from "@material/ripple/util";
    export default {
        props: ["disabled"],
        data() {
            return {
                cls: {},
                style: {},
                eventHandlers: {}
            };
        },
        methods: {
            handleEvent(e) {
                const handlers = this.eventHandlers[e.type];
                if (handlers) {
                    handlers.forEach((handler) => {
                        handler(e);
                    });
                }
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

                return new MDCRippleFoundation({
                    browserSupportsCssVars: () => supportsCssVariables(global),
                    isSurfaceDisabled: () => vm.disabled,
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$set(vm.cls, className, false);
                    },
                    registerInteractionHandler(evt, handler) {
                        if (![
                            "touchstart",
                            "pointerdown",
                            "mousedown",
                            "keydown",
                            "focus",
                            "touchend",
                            "pointerup",
                            "mouseup",
                            "keyup",
                            "blur"
                        ].some((type) => evt === type)) {
                            throw "Cannot handle " + evt + " event.";
                        }
                        registerHandler(vm.eventHandlers, evt, handler);
                    },
                    deregisterInteractionHandler(evt, handler) {
                        vm.eventHandlers[evt].splice(vm.eventHandlers[evt].indexOf(handler), 1);
                    },
                    updateCssVariable(varName, value) {
                        vm.$set(vm.style, varName, value);
                    },
                    computeBoundingRect: () => vm.$el.getBoundingClientRect(),
                    getWindowPageOffset: () => ({x: pageXOffset, y: pageYOffset})
                });
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
