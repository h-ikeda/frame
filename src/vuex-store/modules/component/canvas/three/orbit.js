import {Vector3, Spherical, Euler} from "three";

export default {
    namespaced: true,
    state() {
        return {
            //
            // カメラ視線のターゲット
            // x, y, z
            target: [1.5, 1.5, -1.5],
            //
            // targetを原点とする球面座標系でのカメラ位置
            // radius, phi, theta
            spherical: [20, 1.2, -0.5]
        };
    },
    getters: {
        //
        // 全体のユークリッド座標系におけるカメラ位置をVector3で返します。
        //
        position: (state) => new Vector3()
            .setFromSpherical(new Spherical(...state.spherical).makeSafe())
            .add(new Vector3(...state.target))
    },
    mutations: {
        setTarget(state, target) {
            state.target = target;
        },
        setSpherical(state, spherical) {
            state.spherical = spherical;
        }
    },
    actions: {
        translate({commit, state}, offset) {
            commit("setTarget", state.target.map((value, index) =>
                value + offset[index]
            ));
        },
        rotate({commit, state}, rotation) {
            commit("setSpherical", state.spherical.map((value, index) =>
                index ? (value + rotation[index - 1]): value
            ));
        },
        zoom({commit, state}, scale) {
            commit("setSpherical", state.spherical.map((value, index) =>
                index ? value: (value * scale)
            ));
        },
        //
        // カメラ視線に直交する平面座標系を移動させます。
        //
        translate2D({dispatch, state}, offset) {
            const rotation = new Euler(state.spherical[1] - .5 * Math.PI, state.spherical[2], 0, "ZYX");
            dispatch("translate", new Vector3(...offset, 0).applyEuler(rotation).toArray());
        }
    }
};
