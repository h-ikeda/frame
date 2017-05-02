var browsers = {};
var secrets = {};
var browserNames = [];
if ((function () {
    try {
        secrets = require("./secrets");
        return true;
    } catch(e) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        }
        return process.env.BS_USERNAME && process.env.BS_AUTHKEY;
    }
})()) {
    browsers = require("./karma-browsers");
    browserNames = Object.keys(browsers);
    if (process.env.CIRCLE_NODE_TOTAL > 1) {
        browserNames.sort();
        var num = Math.ceil(browserNames.length / process.env.CIRCLE_NODE_TOTAL);
        browserNames = browserNames.slice(num * process.env.CIRCLE_NODE_INDEX, num * (process.env.CIRCLE_NODE_INDEX + 1));
    }
    browserNames.forEach(function(key) {
        browsers[key].base = "BrowserStack";
    });
}
var webpackConfig = require("./webpack.config");
var browserStackConfig = {
    username: process.env.BS_USERNAME || /["']?([^"']*)/.exec(secrets.BS_USERNAME)[1],
    accessKey: process.env.BS_AUTHKEY || /["']?([^"']*)/.exec(secrets.BS_AUTHKEY)[1],
    project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH || "frame_local",
    build: process.env.CIRCLE_BUILD_NUM || Date.now()
};

var fbUrl = /^.*:\/\/(.*):(\d+)$/.exec(process.env.FB_DATABASEURL);
var fbData = {

};
var firebaseServer = new(require("firebase-server"))(fbUrl[2], fbUrl[1], fbData);

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
        concurrency: 1,
        browsers: browserNames,
        browserStack: browserStackConfig,
        customLaunchers: browsers
    });
};
