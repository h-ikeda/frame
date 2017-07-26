<template>
    <div class="menu-expandable" :class="cls" :style="style">
        <slot />
    </div>
</template>

<script>
    export default {
        props: ["expanded"],
        data() {
            return {
                h: 0
            };
        },
        computed: {
            cls() {
                return {
                    "menu-expandable--expanded": this.expanded
                };
            },
            style() {
                return {
                    height: this.expanded ? this.h: 0
                };
            }
        },
        mounted() {
            this.h = this.$el.firstElementChild.clientHeight + "px";
        }
    };
</script>

<style scoped>
    .menu-expandable {
        overflow: hidden;
        transition: height .195s cubic-bezier(.4, 0, .2, 1);
    }
    .menu-expandable--expanded {
        transition-duration: .225s;
    }
</style>
