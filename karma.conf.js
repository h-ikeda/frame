"use strict";
let bsCaps;
if (process.env.BROWSER_STACK_USERNAME) {
    bsCaps = require("browserstack-capabilities")(process.env.BROWSER_STACK_USERNAME, process.env.BROWSER_STACK_ACCESS_KEY);
}

module.exports = (config) => {
    let customLaunchers = {};
    config.set({
        frameworks: ["mocha"],
        reporters: ["coverage-istanbul", "progress", "BrowserStack"].slice(0, bsCaps ? 3: 2),
        files: ["test/test_index.js"],
        preprocessors: {
            "test/test_index.js": ["webpack", "sourcemap"]
        },
        webpack: require("./webpack.config"),
        beforeMiddleware: ["webpackBlocker"],
        concurrency: bsCaps ? 1: Infinity,
        browsers: bsCaps ? bsCaps.create({
            browser: ["chrome", "firefox"],
            "browser_version": "latest"
        }).map((cap) => {
            cap.base = "BrowserStack";
            var browser = ("device" in cap && cap.device) ? cap.device:
                (cap.browser + " " +
                cap.browser_version + " on " +
                cap.os + " " +
                cap.os_version + " resolution:" +
                cap.resolution);
            customLaunchers[browser] = cap;
            return browser;
        }).filter((_, i) => i % (process.env.CIRCLE_NODE_TOTAL || 1) == process.env.CIRCLE_NODE_INDEX): [],
        browserStack: {
            project: (process.env.CIRCLE_PROJECT_REPONAME || "frame") + "_" + (process.env.CIRCLE_BRANCH || require("child_process").execSync("git branch | grep \\* | cut -d \" \" -f2-"))
        },
        customLaunchers: customLaunchers
    });
};
