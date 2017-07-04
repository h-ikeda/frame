<template>
    <transition>
        <div class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-linear-progress--accent">
            <div class="mdc-linear-progress__buffering-dots"></div>
            <div class="mdc-linear-progress__buffer"></div>
            <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                <span class="mdc-linear-progress__bar-inner"></span>
            </div>
            <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                <span class="mdc-linear-progress__bar-inner"></span>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .v-enter-active, v-leave-active {
        transition: opacity 0.225s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .v-leave-active {
        transition-duration: 0.195s;
    }
    .v-enter, .v-leave-to {
        opacity: 0;
    }
    .v-enter-to, .v-leave {
        opacity: 1;
    }
</style>
