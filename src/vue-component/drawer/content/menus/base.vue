<template>
    <transition @enter="enter" @after-enter="afterEnter">
        <nav class="mdc-list" v-show="expanded">
            <a v-for="item, index of items" :class="cls(item.selected)" @click="select(index)" :key="item.id">
                <i class="material-icons mdc-list-item__start-detail">
                    {{item.icon}}
                </i>
                {{item.caption}}
            </a>
        </nav>
    </transition>
</template>

<script>
    export default {
        methods: {
            
        }
    };
</script>

<style scoped>
    .v-enter-active, .v-leave-active {
        transition: height 0.225s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }
    .v-leave-active {
        transition-duration: 0.195s;
    }
    .v-enter, .v-leave-to {
        height: 0;
    }
</style>
