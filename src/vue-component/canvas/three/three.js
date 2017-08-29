import {Scene} from "three";

export default {
    three: true,
    data() {
        return {
            assets: {
                materials: {},
                geometries: {},
                attributes: {},
                cameras: {},
                scenes: {}
            }
        };
    },
    computed: {
        parent() {
            return (function _parent(c) {
                return !c.$parent ? {$emit() {}, $options: {}}: c.$parent.$options.three ? c.$parent: _parent(c.$parent);
            })(this);
        },
        materials() {
            return {
                ...this.parent.materials,
                ...this.assets.materials
            };
        },
        geometries() {
            return {
                ...this.parent.geometries,
                ...this.assets.geometries
            };
        },
        attributes() {
            return {
                ...this.parent.attributes,
                ...this.assets.attributes
            };
        },
        cameras() {
            return {
                ...this.parent.cameras,
                ...this.assets.cameras
            };
        },
        scenes() {
            return {
                ...this.parent.scenes,
                ...this.assets.scenes
            };
        }
    },
    methods: {
        update() {
            
        }
    },
    beforeCreate() {
        this.$on("update", () => {
            this.parent.$emit("update");
        });
    },
    render(h) {
        if (process.env.NODE_ENV !== "production") {
            return h("div", {
                attrs: {
                    ...this.$props
                }
            }, this.$slots.default);
        }
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
