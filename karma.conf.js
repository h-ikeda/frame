"use strict";

module.exports = (config) => {

    const options = {
        frameworks: ["polyfill", "mocha"],
        reporters: ["coverage-istanbul"],
        files: ["test/index.js"],
        preprocessors: {
            "test/index.js": ["webpack", "sourcemap"]
        },
        webpack: require("./webpack.config"),
        beforeMiddleware: ["webpackBlocker"]
    };

    if (process.env.CIRCLECI) {
        options.reporters.push("junit", "BrowserStack");
        options.junitReporter = {
            outputDir: process.env.CIRCLE_TEST_REPORTS + "/junit/"
        };
        options.concurrency = 1;
        options.browserNoActivityTimeout = 30000;
        options.browserDisconnectTolerance = 3;
        const bsCaps = require("browserstack-capabilities")(process.env.BROWSER_STACK_USERNAME, process.env.BROWSER_STACK_ACCESS_KEY);
        const capabilities = bsCaps.create([{
            "browser": ["chrome", "firefox", "ie", "opera", "edge"],
            "browser_version": "latest",
            "os": "Windows",
            "os_version": ["10", "7"]
        }, {
            "browser": ["chrome", "firefox", "opera", "safari"],
            "browser_version": "latest",
            "os": "OS X",
            "os_version": ["Sierra", "El Capitan"]
        }]).filter((capability) => capability);
        const browsers = [];
        const customLaunchers = {};
        capabilities.forEach((capability) => {
            const browser = [
                "os",
                "os_version",
                "browser",
                "browser_version"
            ].map((key) => capability[key]).join(" ");
            browsers.push(browser);
            capability.base = "BrowserStack";
            customLaunchers[browser] = capability;
        });
        browsers.sort();
        const browserNum = Math.ceil(browsers.length / process.env.CIRCLE_NODE_TOTAL);
        browsers.splice(0, browserNum * process.env.CIRCLE_NODE_INDEX);
        browsers.splice(browserNum * (process.env.CIRCLE_NODE_INDEX + 1));
        options.browserStack = {
            project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH
        };
        options.port = 9999 - process.env.CIRCLE_NODE_INDEX;
    }
    else {
        options.reporters.push("progress");
    }

    config.set(options);
};
