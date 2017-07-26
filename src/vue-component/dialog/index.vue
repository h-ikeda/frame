<template>
    <dialog-root v-model="open" @accept="accept">
        <dialog-header>
            <dialog-header-title>
                Use Google's location service?
            </dialog-header-title>
        </dialog-header>
        <dialog-body :class="{a: open}">
            body here.
        </dialog-body>
        <dialog-footer>
            <dialog-footer-button role="cancel">
                Decline
            </dialog-footer-button>
            <dialog-footer-button role="accept">
                Accept
            </dialog-footer-button>
        </dialog-footer>
    </dialog-root>
</template>

<script>
    import {mapState, mapMutations} from "vuex";
    import mdcDialog from "../mdc-component/dialog";

    export default {
        computed: {
            ...mapState("component/dialog", ["mode"]),
            open: {
                get() {
                    return this.mode;
                },
                set(value) {
                    if (!value) {
                        this.setMode("");
                    }
                }
            }
        },
        methods: {
            ...mapMutations("component/dialog", ["setMode"]),
            accept() {
                console.log("accepted.");
            }
        },
        components: {
            ...mdcDialog
        }
    };
</script>
