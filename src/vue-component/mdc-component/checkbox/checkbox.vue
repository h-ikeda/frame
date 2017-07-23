<template>
    <div class="mdc-checkbox" :class="cls" @animationend="animationend">
        <input type="checkbox" class="mdc-checkbox__native-control" ref="native" @change="change">
        <div class="mdc-checkbox__background">
            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
            </svg>
            <div class="mdc-checkbox__mixedmark"></div>
        </div>
    </div>
</template>

<script>
    import {MDCCheckboxFoundation} from "@material/checkbox";
    export default {
        model: {
            prop: "checked",
            event: "change"
        },
        props: ["checked", "indeterminate", "disabled"],
        data() {
            return {
                cls: {},
                aeh: [],
                ch: [],
                attached: false
            };
        },
        computed: {
            foundation() {
                const vm = this;
                return new MDCCheckboxFoundation({
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$delete(vm.cls, className);
                    },
                    registerAnimationEndHandler(handler) {
                        vm.aeh.push(handler);
                    },
                    deregisterAnimationEndHandler(handler) {
                        vm.aeh.splice(vm.aeh.indexOf(handler), 1);
                    },
                    registerChangeHandler(handler) {
                        vm.ch.push(handler);
                    },
                    deregisterChangeHandler(handler) {
                        vm.ch.splice(vm.ch.indexOf(handler), 1);
                    },
                    getNativeControl() {
                        return vm.$refs.native;
                    },
                    isAttachedToDOM() {
                        return vm.attached;
                    }
                });
            }
        },
        methods: {
            animationend(e) {
                this.aeh.forEach((h) => {
                    h(e);
                });
            },
            change(e) {
                this.ch.forEach((h) => {
                    h(e);
                });
                this.$emit("change", this.foundation.isIndeterminate() ? undefined: this.foundation.isChecked());
            }
        },
        watch: {
            checked(checked) {
                this.foundation.setChecked(checked);
            },
            indeterminate(indeterminate) {
                this.foundation.setIndeterminate(indeterminate);
            },
            disabled(disabled) {
                this.foundation.setDisabled(disabled);
            }
        },
        mounted() {
            const vm = this;
            const foundation = vm.foundation;
            foundation.init();
            vm.attached = true;
            foundation.setChecked(vm.checked);
            foundation.setIndeterminate(vm.indeterminate);
            foundation.setDisabled(vm.disabled);
        },
        beforeDestroy() {
            this.foundation.destroy();
            this.attached = false;
        }
    };
</script>
