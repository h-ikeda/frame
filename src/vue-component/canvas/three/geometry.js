import {Geometry} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name"],
    computed: {
        instance: () => new Geometry()
    }
};
