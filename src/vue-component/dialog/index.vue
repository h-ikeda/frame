<template>
    <aside class="mdc-dialog" :class="cls" :style="stl">
        <div class="mdc-dialog__surface" ref="surface" @transitionend="execTeh">
            <component :is="header" class="mdc-dialog__header" />
            <component :is="body" class="mdc-dialog__body" />
            <component :is="footer" class="mdc-dialog__footer" />
        </div>
        <div class="mdc-dialog__backdrop"></div>
    </aside>
</template>

<script>
    import {mapState} from "vuex";
    import {MDCDialogFoundation} from "@material/dialog";
    import settings from "./settings";

    const components = {
        settings
    };

    export default {
        data() {
            return {
                cls: {},
                stl: {},
                teh: []
            };
        },
        computed: {
            ...mapState("component/dialog", ["mode"]),
            header() {
                return components[this.mode].header;
            },
            body() {
                return components[this.mode].body;
            },
            footer() {
                return components[this.mode].footer;
            },
            foundation() {
                const vm = this;
                return new MDCDialogFoundation({
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$delete(vm.cls, className);
                    },
                    setStyle(propertyName, value) {
                        vm.$set(vm.stl, propertyName, value);
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
                        vm.$el.addEventListener(evt, handler);
                    },
                    deregisterInteractionHandler(evt, handler) {
                        vm.$el.removeEventListener(evt, handler);
                    },
                    registerSurfaceInteractionHandler(evt, handler) {
                        vm.$refs.surface.addEventListener(evt, handler);
                    },
                    deregisterSurfaceInteractionHandler(evt, handler) {
                        vm.$refs.surface.removeEventListener(evt, handler);
                    },
                    registerDocumentKeydownHandler(handler) {
                        document.addEventListener("keydown", handler);
                    },
                    deregisterDocumentKeydownHandler(handler) {
                        document.removeEventListener("keydown", handler);
                    },
                    registerTransitionEndHandler(handler) {
                        vm.teh.push(handler);
                    },
                    deregisterTransitionEndHandler(handler) {
                        vm.teh.splice(vm.teh.indexOf(handler), 1);
                    },
                    notifyAccept() {
                        vm.teh.push(() => {
                            vm.$store.commit("component/dialog/setMode", "");
                        });
                    },
                    notifyCancel() {
                        vm.teh.push(() => {
                            vm.$store.commit("component/dialog/setMode", "");
                        });
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
        methods: {
            execTeh(e) {
                this.teh.forEach((f) => {f(e);});
            }
        },
        mounted() {
            this.foundation.init();
            this.$nextTick(() => {
                this.foundation.open();
            });
        },
        beforeDestroy() {
            this.foundation.destroy();
        }
    };
</script>
