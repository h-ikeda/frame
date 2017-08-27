import {Material} from "three";
import three from "./three";

export default {
    mixins: [three],
    props: ["name"],
    computed: {
        instance: () => new Material()
    }
};
