<template>
    <transition @enter="enter" @after-enter="afterEnter" >
        <nav class="mdc-list" v-show="expanded || start" :style="style">
            <slot />
        </nav>
    </transition>
</template>

<script>
    export default {
        props: {
            expanded: {
                default: true
            }
        },
        data() {
            return {
                start: true,
                transition: false,
                height: ""
            };
        },
        computed: {
            style() {
                return this.transition ? {height: this.height}: {};
            }
        },
        methods: {
            enter() {
                requestAnimationFrame(() => {
                    this.transition = true;
                });
            },
            afterEnter() {
                this.transition = false;
            }/*,
            beforeLeave() {
                this.transition = true;
            },
            leave() {
                requestAnimationFrame(() => {
                    this.transition = false;
                });
            }*/
        },
        mounted() {
            this.height = this.$el.clientHeight;
            this.start = false;
            console.log(this.height)
        }
    };
</script>

<style scoped>
    .v-enter-active, .v-leave-active {
        transition: height 10.225s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }
    .v-leave-active {
        transition-duration: 10.195s;
    }
    .v-enter, .v-leave-to {
        height: 0;
    }
</style>
