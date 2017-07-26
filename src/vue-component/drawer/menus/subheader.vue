<template>
    <h3 class="mdc-list-group__subheader menu-subheader" :class="cls">
        <slot />
        <transition mode="out-in">
            <i class="material-icons" :key="icon">
                {{icon}}
            </i>
        </transition>
    </h3>
</template>

<script>
    export default {
        props: ["expanded"],
        computed: {
            icon() {
                return this.expanded ? "expand_less": "expand_more";
            },
            cls() {
                return {
                    "menu-subheader--expanded": this.expanded
                };
            }
        }
    };
</script>

<style scoped>
    .menu-subheader {
        display: flex;
        justify-content: space-between;
        margin-left: 1rem;
        margin-right: 1rem;
        color: rgba(0, 0, 0, 0.54);
        cursor: pointer;
    }
    .v-enter-active, .v-leave-active {
        transition: transform .0975s cubic-bezier(.4, 0, .2, 1);
    }
    .menu-subheader--expanded .v-enter-active, .menu-subheader--expanded .v-leave-active {
        transition-duration: .1125s
    }
    .v-enter, .v-leave-to {
        transform: rotateX(60deg);
    }
    .v-enter-to, .v-leave {
        transform: rotateX(0deg);
    }
</style>
