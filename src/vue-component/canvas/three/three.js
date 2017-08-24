export default {
    data() {
        return {
            localMaterials: {},
            localGeometries: {},
            localAttributes: {}
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
            }
        });
        this.$on("undefine", (name, instance) => {
            if (instance.isMaterial) {
                this.$delete(this.localMaterials, name);
            } else if (instance.isGeometry || instance.isBufferGeometry) {
                this.$delete(this.localGeometries, name);
            } else if (instance.isBufferAttribute) {
                this.$delete(this.localAttributes, name);
            }
        });
    }
};
