module.exports = function(config) {
    config.set({
        frameworks: ["mocha"],
        reporters: ["mocha"],
        files: ["test/test_index.js"],
        preprocessors: {
            "test/test_index.js": ["webpack", "sourcemap"]
        },
        beforeMiddleware: ["webpackBlocker"],
        middleware: ["firebaseServer"],
        webpack: require("./webpack.config"),
        concurrency: process.env.BS_USERNAME && process.env.BS_AUTHKEY ? 1: Infinity,
        browsers: process.env.BS_USERNAME && process.env.BS_AUTHKEY ? (function(keys) {
            keys.sort();
            return keys;
        }(Object.keys(this.customLaunchers))).filter(function(value, index) {
            return process.env.CIRCLE_NODE_TOTAL < 2 || index % process.env.CIRCLE_NODE_TOTAL === parseInt(process.env.CIRCLE_NODE_INDEX);
        }): [],
        browserStack: {
            username: process.env.BS_USERNAME,
            accessKey: process.env.BS_AUTHKEY,
            project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH || "frame_local",
            build: process.env.CIRCLE_BUILD_NUM || Date.now()
        },
        customLaunchers: (function(arr) {
            var launchers = {};
            arr.forEach(function(obj) {
                var name = "device" in obj ? obj.device:
                    obj.browser + " " +
                    obj.browser_version + " on " +
                    obj.os + " " +
                    obj.os_version + " resolution:" +
                    obj.resolution;
                launchers[name] = obj;
            });
            return launchers;
        }(require("./karma-browsers")).map(function(obj) {
            obj.base = "BrowserStack";
            return obj;
        }))
    });
};
