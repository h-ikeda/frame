import assert from "assert";
import Vue from "vue";
import Vuex from "vuex";

const src = require.context("istanbul-instrumenter-loader!../src/", true, /\.(?:vue|js)$/);
const test = require.context("./test_src/", true, /\.js$/);

global.requireSrc = (path, ext) => src(
    path
    .replace(/\/test_/g, "/")
    .replace(/^(?:test\/)?src\//, "./")
    .replace(/[^\/]*\/\.\.\//g, "")
    .replace(/\.js$/, "." + (ext || "js"))
);

describe("全てのソースファイルに対応するテストファイルが存在することを確認", function() {
    // Vueのインスタンスを起動するルートindex.jsファイルを除く。
    src.keys().filter((key) => key !== "./index.js").forEach((srcPath) => {
        const testPath = srcPath.replace(/\//g, "/test_").replace(/\.vue$/, ".js");
        const testPathDisp = testPath.replace(/^\.\//, "test/test_src/");
        it("ソース: " + srcPath.replace(/^\.\//, "src/") + " テスト: " + testPathDisp, function() {
            assert(test.keys().indexOf(testPath) >= 0, testPathDisp + " does not exist.");
        });
    });
});

//
// src/index.js (vueインスタンスを起動するモジュール) 以外のファイルを全て読み込みます。
// src/index.js内で読み込んでいるvuejsのプラグインは、ここでロードします。
//
Vue.use(Vuex);

src.keys().filter((key) => key !== "./index.js").forEach(src);
test.keys().forEach(test);
