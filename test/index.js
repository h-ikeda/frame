const src = require.context("istanbul-instrumenter-loader?esModules!../src/", true, /\.(vue|js)$/);
const test = require.context("../src/", true, /test_[^\/]*\.spec\.js$/);

src.keys().filter((key) => !key.match(/test_[^\/]*\.spec\.js$/)).forEach(src);
test.keys().forEach(test);
