import object3d from "./object3d";
import {Line} from "three";

export default {
    mixins: [object3d],
    computed: {
        instance() {
            return new Line();
        }
    }
};
