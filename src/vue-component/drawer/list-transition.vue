<template>
    <transition>
        <slot />
    </transition>
</template>

<style scoped>
    /*
        リストが縦に伸縮するtransition
    */
    .v-enter-active, .v-leave-active {
        transition: max-height 0.225s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }
    .v-leave-active {
        transition-duration: 0.195s;
    }
    .v-enter, .v-leave-to {
        max-height: 0;
    }
    .v-enter-to, .v-leave {
        max-height: 100vh;
    }
</style>
