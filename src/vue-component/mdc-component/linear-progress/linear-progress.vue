<template>
    <div :class="cls">
        <div class="mdc-linear-progress__buffering-dots"></div>
        <div class="mdc-linear-progress__buffer" ref="buffer"></div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar" ref="primary">
            <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
        </div>
    </div>
</template>

<script>
    import {MDCLinearProgressFoundation} from "@material/linear-progress";

    export default {
        props: ["indeterminate", "progress", "buffer", "reverse", "open", "accent"],
        data() {
            return {
                cls: {
                    "mdc-linear-progress": true,
                    "mdc-linear-progress--accent": this.accent,
                    "mdc-linear-progress--reversed": this.reverse,
                    "mdc-linear-progress--indeterminate": this.indeterminate
                }
            };
        },
        watch: {
            indeterminate(indeterminate) {
                this.foundation.setDeterminate(!indeterminate);
            },
            progress(progress) {
                this.foundation.setProgress(progress);
            },
            buffer(buffer) {
                this.foundation.setBuffer(buffer);
            },
            reverse(reverse) {
                this.foundation.setReverse(reverse);
            },
            open(open) {
                this.foundation[open ? "open": "close"]();
            }
        },
        computed: {
            foundation() {
                const vm = this;
                return new MDCLinearProgressFoundation({
                    addClass(className) {
                        vm.$set(vm.cls, className, true);
                    },
                    removeClass(className) {
                        vm.$set(vm.cls, className, false);
                    },
                    hasClass(className) {
                        vm.$el.classList.contains(className);
                    },
                    getPrimaryBar: () => vm.$refs.primary,
                    getBuffer: () => vm.$refs.buffer,
                    setTransform(el, value) {
                        el.style.transform = value;
                    }
                });
            }
        },
        mounted() {
            const vm = this;
            const foundation = vm.foundation;
            foundation.init();
            if (!vm.open) {
                foundation.close();
            }
            if (vm.progress) {
                foundation.setProgress(vm.progress);
            }
            if (vm.buffer) {
                foundation.setBuffer(vm.buffer);
            }
        },
        beforeDestroy() {
            this.foundation.destroy();
        }
    };
</script>
