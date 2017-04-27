var browsers = require("./karma-browsers");
Object.keys(browsers).forEach(function(key) {
    browsers[key].base = "BrowserStack";
});

module.exports = function(config) {
    config.set({
        frameworks: ["mocha"],
        files: ["**!(node_modules)**/test/**test_*.js"],
        preprocessors: {
            "**": ["webpack"]
        },
        webpack: {
            module: require("./webpack.config").module,
            resolve: require("./webpack.config").resolve
        },
        concurrency: 2,
        browsers: Object.keys(browsers),
        browserStack: {
            username: process.env.BS_USERNAME || require("./secrets").BS_USERNAME,
            accessKey: process.env.BS_AUTHKEY || require("./secrets").BS_AUTHKEY,
            project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH || "frame_local",
            build: process.env.CIRCLE_BUILD_NUM || Date.now()
        },
        customLaunchers: browsers
    });
};
