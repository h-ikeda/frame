import object3d from "./object3d";
import {Scene} from "three";

export default {
    // THREE.Object3Dのラッパーコンポーネントを継承。
    mixins: [object3d],
    methods: {
        // createInstanceメソッドをオーバーライドしてSceneのインスタンスを生成します。
        createInstance() {
            return new Scene();
        }
    }
};
