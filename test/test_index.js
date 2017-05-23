import assert from "assert";

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
    src.keys().forEach(srcPath => {
        const testPath = srcPath.replace(/\//g, "/test_").replace(/\.vue$/, ".js");
        const testPathDisp = testPath.replace(/^\.\//, "test/test_src/");
        it("ソース: " + srcPath.replace(/^\.\//, "src/") + " テスト: " + testPathDisp, function() {
            assert(test.keys().indexOf(testPath) >= 0, testPathDisp + " does not exist.");
        });
    });
});

src.keys().forEach(src);
test.keys().forEach(test);
