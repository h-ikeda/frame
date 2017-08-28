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
                return !c.$parent ? {$emit: () => {}}: c.$parent.$options.three ? c.$parent: _parent(c.$parent);
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
    watch: {
        instance(instance, oldInstance) {
            if (oldInstance) {
                if (oldInstance.isMaterial) {
                    this.$delete(this.parent.assets.materials, this.name);
                } else if (oldInstance.isGeometry || oldInstance.isBufferGeometry) {
                    this.$delete(this.parent.assets.geometries, this.name);
                } else if (oldInstance.isBufferAttribute) {
                    this.$delete(this.parent.assets.attributes, this.name);
                } else if (oldInstance.isCamera) {
                    this.$delete(this.parent.assets.cameras, this.name);
                } else if (oldInstance instanceof Scene) {
                    this.$delete(this.parent.assets.scenes, this.name);
                }
            }
            if (instance) {
                if (instance.isMaterial) {
                    this.$set(this.parent.assets.materials, this.name, instance);
                } else if (instance.isGeometry || instance.isBufferGeometry) {
                    this.$set(this.parent.assets.geometries, this.name, instance);
                } else if (instance.isBufferAttribute) {
                    this.$set(this.parent.assets.attributes, this.name, instance);
                } else if (instance.isCamera) {
                    this.$set(this.parent.assets.cameras, this.name, instance);
                } else if (this.instance instanceof Scene) {
                    this.$set(this.parent.assets.scenes, this.name, instance);
                }
            }
        }
    },
    beforeCreate() {
        this.$on("update", () => {
            this.parent.$emit("update");
        });
    },
    created() {
        if (this.instance) {
            if (this.instance.isMaterial) {
                this.$set(this.parent.assets.materials, this.name, this.instance);
            } else if (this.instance.isGeometry || this.instance.isBufferGeometry) {
                this.$set(this.parent.assets.geometries, this.name, this.instance);
            } else if (this.instance.isBufferAttribute) {
                this.$set(this.parent.assets.attributes, this.name, this.instance);
            } else if (this.instance.isCamera) {
                this.$set(this.parent.assets.cameras, this.name, this.instance);
            } else if (this.instance instanceof Scene) {
                this.$set(this.parent.assets.scenes, this.name, this.instance);
            }
        }
    },
    beforeDestroy() {
        if (this.instance) {
            if (this.instance.isMaterial && this.parent.assets.materials[this.name] === this.instance) {
                this.$delete(this.parent.assets.materials, this.name);
            } else if ((this.instance.isGeometry || this.instance.isBufferGeometry) && this.parent.assets.geometries[this.name] === this.instance) {
                this.$delete(this.parent.assets.geometries, this.name);
            } else if (this.instance.isBufferAttribute && this.parent.assets.attributes[this.name] === this.instance) {
                this.$delete(this.parent.assets.attributes, this.name);
            } else if (this.instance.isCamera && this.parent.assets.cameras[this.name] === this.instance) {
                this.$delete(this.parent.assets.cameras, this.name);
            } else if (this.instance instanceof Scene && this.parent.assets.scenes[this.name] === this.instance) {
                this.$delete(this.parent.assets.scenes, this.name);
            }
        }
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
