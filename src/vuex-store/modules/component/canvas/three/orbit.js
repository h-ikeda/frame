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
            spherical: [20, 1.2, -0.5],
            //
            // 変化速度の設定
            //
            magnify: {
                translate: .1,
                rotate: .1,
                zoom: 1.01
            }
        };
    },
    getters: {
        //
        // 全体のユークリッド座標系におけるカメラ位置をVector3で返します。
        //
        position: (state) => new Vector3()
            .setFromSpherical(new Spherical(...state.spherical).makeSafe())
            .add(new Vector3(...state.target)),
        //
        // state.targetの座標を持つVector3オブジェクトを返します。
        //
        target: (state) => new Vector3(...state.target)
    },
    mutations: {
        setTarget(state, target) {
            state.target = target;
        },
        setSpherical(state, spherical) {
            state.spherical = spherical;
        },
        setMagnify(state, magnify) {
            Object.keys(magnify).forEach((key) => {
                if (key in state.magnify) {
                    state.magnify[key] = magnify[key];
                }
            });
        }
    },
    actions: {
        translate({commit, state}, offset) {
            const [x, y, z] = state.target, m = state.magnify.translate, [deltaX, deltaY, deltaZ] = offset;
            commit("setTarget", [
                x + deltaX * m,
                y + deltaY * m,
                z + deltaZ * m
            ]);
        },
        rotate({commit, state}, rotation) {
            //
            // φ（y軸に対する傾斜角）は0～180度とし、範囲を超えるときは0または180度とする。
            // θ（y軸周りの回転角）は0～360度とし、範囲を超えるときは範囲内の0～360度に換算する。
            //
            const [radius, phi, theta] = state.spherical, m = state.magnify.rotate, [deltaPhi, deltaTheta] = rotation;
            commit("setSpherical", [
                radius,
                Math.max(Math.min(phi + deltaPhi * m, Math.PI), 0),
                (theta + (deltaTheta < 0 ? deltaTheta * m % (Math.PI * 2) + Math.PI * 2: deltaTheta * m)) % (Math.PI * 2)
            ]);
        },
        zoom({commit, state}, scale) {
            let [radius, phi, theta] = state.spherical, m = state.magnify.zoom;
            commit("setSpherical", [
                radius / (1 + scale * m),
                phi,
                theta
            ]);
        },
        translate2D({dispatch, state}, offset) {
            //
            // カメラ視線に直交する平面座標系を移動させます。
            //
            const [, phi, theta] = state.spherical;
            const rotation = new Euler(phi - .5 * Math.PI, theta, 0, "ZYX");
            dispatch("translate", new Vector3(...offset, 0).applyEuler(rotation).toArray());
        }
    }
};
