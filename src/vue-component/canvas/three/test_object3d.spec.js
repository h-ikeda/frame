import object3d from "./object3d";
import {Vector3, Euler} from "three";
import assert from "assert";

const {
    _position,
    _rotation
} = object3d.computed;

describe("object3dコンポーネントのテスト", function() {
    describe("computedのテスト", function() {
        describe("_positionのテスト", function() {
            it("positionがundefinedのとき、Vector3(0, 0, 0)を返す。", function() {
                const vm = {};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(0, 0, 0).equals(result));
            });
            it("positionがnullのとき、Vector3(0, 0, 0)を返す。", function() {
                const vm = {position: null};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(0, 0, 0).equals(result));
            });
            it("positionが配列のとき、変換されたVector3を返す。", function() {
                const vm = {position: [1.2, 3.8, 4.2]};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("positionが短い配列のとき、不足を0で埋める。", function() {
                const vm = {position: [1.2, 3.8]};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 0).equals(result));
            });
            it("positionが長い配列のとき、先頭の3値をx, y, zとする。", function() {
                const vm = {position: [1.2, 3.8, -4.2, 5.8, -8.2]};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, -4.2).equals(result));
            });
            it("positionが文字列の配列のとき、変換されたVector3を返す。", function() {
                const vm = {position: ["1.2", "3.8", "4.2"]};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("positionが空白を含む文字列の配列のとき、変換されたVector3を返す。", function() {
                const vm = {position: [" 1.2", "3.8 ", " 4.2  "]};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("positionが数値以外を含む文字列の配列のとき、可能な限り数値に変換する。", function() {
                const vm = {position: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  "]};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2e4, 3.5e-5, 4.2).equals(result));
            });
            it("positionがオブジェクトのとき、プロパティx, y, zをコピーしたVector3を返す。", function() {
                const vm = {position: {x: -1, y: -5, z: 6.8}};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("positionがオブジェクトでプロパティが文字列のときは、数値に変換する。", function() {
                const vm = {position: {x: "-1", y: "-5", z: "6.8"}};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("positionがオブジェクトでプロパティが空白を含む文字列のときは、数値に変換する。", function() {
                const vm = {position: {x: "-1 '", y: "　-5", z: " 6.8'"}};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("positionがオブジェクトでプロパティが数値でない文字列のときは、可能な限り数値に変換する。", function() {
                const vm = {position: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'"}};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionが文字列のとき、スペース区切りの配列としてパースする。", function() {
                const vm = {position: "-1.0 -5e8 6.8"};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionの文字列が重複するスペースを含むとき。", function() {
                const vm = {position: "-1.0  -5e8   6.8"};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionの文字列が前後にスペースを含むとき。", function() {
                const vm = {position: " -1.0  -5e8   6.8  "};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionの文字列が数値以外の文字を含むとき。", function() {
                const vm = {position: " -1.0ad<'  -5e8'   6.8x9  "};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionが空文字のとき、Vector3(0, 0, 0)を返す。", function() {
                const vm = {position: ""};
                const result = _position.call(vm);
                assert(result.isVector3);
                assert(new Vector3(0, 0, 0).equals(result));
            });
        });
        describe("_rotationのテスト", function() {
            it("rotationがundefinedのとき、Euler(0, 0, 0, 'XYZ')を返す。", function() {
                const vm = {};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(0, 0, 0, "XYZ").equals(result));
            });
            it("rotationがnullのとき、Euler(0, 0, 0, 'XYZ')を返す。", function() {
                const vm = {rotation: null};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(0, 0, 0, "XYZ").equals(result));
            });
            it("rotationが配列のとき、変換されたEulerを返す。", function() {
                const vm = {rotation: [1.2, 3.8, 4.2, "YXZ"]};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 4.2, "YXZ").equals(result));
            });
            it("rotationが短い配列のとき、不足を0で埋める。", function() {
                const vm = {rotation: [1.2, 3.8]};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 0, "XYZ").equals(result));
            });
            it("rotationが長い配列のとき、先頭の3値をx, y, zとする。", function() {
                const vm = {rotation: [1.2, 3.8, -4.2, 5.8, -8.2]};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, -4.2, "XYZ").equals(result));
            });
            it("rotationが文字列の配列のとき、変換されたEulerを返す。", function() {
                const vm = {rotation: ["1.2", "3.8", "4.2", "XYZ"]};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 4.2, "XYZ").equals(result));
            });
            it("rotationが空白を含む文字列の配列のとき、変換されたEulerを返す。", function() {
                const vm = {rotation: [" 1.2", "3.8 ", " 4.2  ", "XYZ "]};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 4.2, "XYZ").equals(result));
            });
            it("rotationが数値以外を含む文字列の配列のとき、可能な限り数値に変換する。", function() {
                const vm = {rotation: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  ", "XYZ"]};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2e4, 3.5e-5, 4.2).equals(result));
            });
            it("rotationがオブジェクトのとき、プロパティx, y, zをコピーしたEulerを返す。", function() {
                const vm = {rotation: {x: -1, y: -5, z: 6.8, order: "XYZ"}};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5, 6.8, "XYZ").equals(result));
            });
            it("rotationがオブジェクトでプロパティが文字列のときは、数値に変換する。", function() {
                const vm = {rotation: {x: "-1", y: "-5", z: "6.8", order: "XYZ"}};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5, 6.8, "XYZ").equals(result));
            });
            it("rotationがオブジェクトでプロパティが空白を含む文字列のときは、数値に変換する。", function() {
                const vm = {rotation: {x: "-1 '", y: "　-5", z: " 6.8'", order: "XYZ"}};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5, 6.8, "XYZ").equals(result));
            });
            it("rotationがオブジェクトでプロパティが数値でない文字列のときは、可能な限り数値に変換する。", function() {
                const vm = {rotation: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'", order: "XYZ"}};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationが文字列のとき、スペース区切りの配列としてパースする。", function() {
                const vm = {rotation: "-1.0 -5e8 6.8 XYZ"};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationの文字列が重複するスペースを含むとき。", function() {
                const vm = {rotation: "-1.0  -5e8   6.8"};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationの文字列が前後にスペースを含むとき。", function() {
                const vm = {rotation: " -1.0  -5e8   6.8  "};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationの文字列が数値以外の文字を含むとき。", function() {
                const vm = {rotation: " -1.0ad<'  -5e8'   6.8x9  "};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationが空文字のとき、Euler(0, 0, 0, 'XYZ')を返す。", function() {
                const vm = {rotation: ""};
                const result = _rotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(0, 0, 0, "XYZ").equals(result));
            });
        });
    });
});
