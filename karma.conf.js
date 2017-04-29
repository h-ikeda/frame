var browsers = {};
var secrets = {};
if ((function () {
    try {
        secrets = require("./secrets");
        return true;
    } catch(e) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        }
        return false;
    }
})()) {
    browsers = require("./karma-browsers");
    Object.keys(browsers).forEach(function(key) {
        browsers[key].base = "BrowserStack";
    });
}
var webpackConfig = require("./webpack.config");
var browserStackConfig = {
    username: process.env.BS_USERNAME || secrets.BS_USERNAME,
    accessKey: process.env.BS_AUTHKEY || secrets.BS_AUTHKEY,
    project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH || "frame_local",
    build: process.env.CIRCLE_BUILD_NUM || Date.now()
};

module.exports = function(config) {
    config.set({
        frameworks: ["mocha"],
        files: ["**/test/**/test_*.js"],
        exclude: ["**/node_modules/**/test/**/test_*.js"],
        preprocessors: {
            "**/test/**/test_*.js": ["webpack"]
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            plugins: webpackConfig.plugins
        },
        concurrency: 2,
        browsers: Object.keys(browsers),
        browserStack: browserStackConfig,
        customLaunchers: browsers
    });
};
