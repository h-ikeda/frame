import base from "./base.vue";

export default {
    mixin: [],
    data() {
        return {
            expanded: true,
            selected: "nodes",
            items: [{
                id: "nodes",
                caption: "Nodes",
                icon: "star"
            }]
        }
    },
    computed: {
        
    }
};
