"use strict";

module.exports = (config) => {

    const frameworks = ["polyfill", "mocha"];
    const reporters = ["coverage-istanbul", "progress"];
    const files = ["test/index.js"];
    const preprocessors = {
        "test/index.js": ["webpack", "sourcemap"]
    };
    const webpack = require("./webpack.config");
    const beforeMiddleware = ["webpackBlocker"];
    let concurrency;
    const browsers = [];
    const customLaunchers = {};
    const browserStack = {
        project: "frame_" + require("child_process").execSync("git branch | grep \\* | cut -d \" \" -f2-")
    };
    let browserNoActivityTimeout;
    let port;
    let browserDisconnectTolerance;

    if (config.singleRun && process.env.BROWSER_STACK_USERNAME) {
        reporters.push("BrowserStack");
        concurrency = 1;
        browserNoActivityTimeout = 30000;
        browserDisconnectTolerance = 3;
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
    }

    let junitReporter;

    if (process.env.CIRCLECI) {
        reporters.push("junit");
        junitReporter = {
            outputDir: process.env.CIRCLE_TEST_REPORTS
        };
        browsers.sort();
        const browserNum = Math.ceil(browsers.length / process.env.CIRCLE_NODE_TOTAL);
        browsers.splice(0, browserNum * process.env.CIRCLE_NODE_INDEX);
        browsers.splice(browserNum * (process.env.CIRCLE_NODE_INDEX + 1));
        browserStack.project = process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH;
        port = 9999 - process.env.CIRCLE_NODE_INDEX;
    }
    else {
        browserStack.build = Date.now();
    }

    config.set({
        frameworks,
        reporters,
        files,
        preprocessors,
        webpack,
        beforeMiddleware,
        concurrency,
        browsers,
        browserStack,
        customLaunchers,
        browserNoActivityTimeout,
        port,
        browserDisconnectTolerance,
        junitReporter
    });
};
