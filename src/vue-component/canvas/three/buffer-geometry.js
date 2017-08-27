import {BufferGeometry} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name", "attribute"],
    computed: {
        instance: () => new BufferGeometry()
    },
    created() {
        if (this.attribute) {
            this.attribute.split(";").forEach((attr) => {
                const [name, attribute] = attr.split(":");
                this.instance.addAttribute(name.trim(), this.attributes[attribute.trim()]);
            });
        }
    }
};
