"use strict";

module.exports = (config) => {

    const frameworks = ["polyfill", "mocha"];
    const reporters = ["coverage-istanbul", "progress"];
    const polyfill = ["Promise"];
    const files = ["test/test_index.js"];
    const preprocessors = {
        "test/test_index.js": ["webpack", "sourcemap"]
    };
    const webpack = require("./webpack.config");
    const beforeMiddleware = ["webpackBlocker"];
    let concurrency = Infinity;
    const browsers = [];
    const customLaunchers = {};
    const browserStack = {
        project: "frame_" + require("child_process").execSync("git branch | grep \\* | cut -d \" \" -f2-")
    };

    if (config.singleRun && process.env.BROWSER_STACK_USERNAME) {
        reporters.push("BrowserStack");
        concurrency = 1;
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
            "os_version": ["Sierra", "El Capitan", "Yosemite"]
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

    if (process.env.CIRCLECI) {
        browsers.sort();
        const browserNum = Math.ceil(browsers.length / process.env.CIRCLE_NODE_TOTAL);
        browsers.splice(0, browserNum * process.env.CIRCLE_NODE_INDEX);
        browsers.splice(browserNum * (process.env.CIRCLE_NODE_INDEX + 1));
        browserStack.project = process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH;
    }
    else {
        browserStack.build = Date.now();
    }

    config.set({
        frameworks,
        polyfill,
        reporters,
        files,
        preprocessors,
        webpack,
        beforeMiddleware,
        concurrency,
        browsers,
        browserStack,
        customLaunchers
    });
};
