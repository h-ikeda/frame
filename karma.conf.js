var browsers = require("./test/browsers");
Object.keys(browsers).forEach(function(key) {
    browsers[key].base = "BrowserStack";
});
var webpackConfig = require("./webpack.config");

module.exports = function(config) {
    config.set({
        frameworks: ["mocha"],
        files: ["!(node_modules)/test/*.js"],
        preprocessors: {
            "**/*": ["webpack"]
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        singleRun: true,
        autoWatch: false,
        concurrency: 2,
        browsers: Object.keys(browsers),
        browserStack: {
            username: process.env.BS_USERNAME || "hirokiikeda1",
            accessKey: process.env.BS_AUTHKEY || "1JSwFjEmHAJzMRYtyp6q",
            project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH,
            build: process.env.CIRCLE_BUILD_NUM
        },
        customLaunchers: browsers
    });
};
