import {Scene} from "three";

export default {
    data() {
        return {
            localMaterials: {},
            localGeometries: {},
            localAttributes: {},
            localCameras: {},
            localScenes: {}
        };
    },
    computed: {
        three: () => true,
        materials() {
            const parent = this.parent();
            return parent ? {
                ...parent.materials,
                ...this.localMaterials
            }: this.localMaterials;
        },
        geometries() {
            const parent = this.parent();
            return parent ? {
                ...parent.geometries,
                ...this.localGeometries
            }: this.localGeometries;
        },
        attributes() {
            const parent = this.parent();
            return parent ? {
                ...parent.attributes,
                ...this.localAttributes
            }: this.localAttributes;
        },
        cameras() {
            const parent = this.parent();
            return parent ? {
                ...parent.cameras,
                ...this.localCameras
            }: this.localCameras;
        },
        scenes() {
            const parent = this.parent();
            return parent ? {
                ...parent.scenes,
                ...this.localScenes
            }: this.localScenes;
        }
    },
    methods: {
        parent(component) {
            const vm = component || this;
            return (!vm.$parent || vm.$parent.three) ? vm.$parent: this.parent(vm.$parent);
        }
    },
    beforeCreate() {
        this.$on("define", (name, instance) => {
            if (instance.isMaterial) {
                this.$set(this.localMaterials, name, instance);
            } else if (instance.isGeometry || instance.isBufferGeometry) {
                this.$set(this.localGeometries, name, instance);
            } else if (instance.isBufferAttribute) {
                this.$set(this.localAttributes, name, instance);
            } else if (instance.isCamera) {
                this.$set(this.localCameras, name, instance);
            } else if (instance instanceof Scene) {
                this.$set(this.localScenes, name, instance);
            }
        });
        this.$on("undefine", (name, instance) => {
            if (instance.isMaterial) {
                this.$delete(this.localMaterials, name);
            } else if (instance.isGeometry || instance.isBufferGeometry) {
                this.$delete(this.localGeometries, name);
            } else if (instance.isBufferAttribute) {
                this.$delete(this.localAttributes, name);
            } else if (instance.isCamera) {
                this.$delete(this.localCameras, name);
            } else if (instance instanceof Scene) {
                this.$delete(this.localScenes, name);
            }
        });
    }
};
