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
        beforeMiddleware: ["webpackBlocker"],
        coverageIstanbulReporter: {
            dir: "coverage/%browser%"
        }
    };

    if (!process.env.CIRCLECI) {
        options.reporters.push("progress");
    } else {
        options.singleRun = true;
        options.logLevel = config.LOG_ERROR;
        options.reporters.push("junit");
        options.junitReporter = {
            outputDir: "./junit/",
            outputFile: "junit.xml",
            useBrowserName: false
        };
        options.browserNoActivityTimeout = 240000;
        options.browserDisconnectTolerance = 1;
        options.browserDisconnectTimeout = 10000;
        options.captureTimeout = 240000;

        switch (process.env.CIRCLE_NODE_INDEX) {
            case "0":
                // Test on BrowserStack
                options.reporters.push("BrowserStack");
                options.browserStack = {
                    project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH
                };
                options.concurrency = 1;
                options.customLaunchers = require("./browser-capabilities");
                Object.keys(options.customLaunchers).forEach(function(key) {
                    if (!key.includes("(BrowserStack)")) {
                        delete options.customLaunchers[key];
                    }
                });
                options.browsers = Object.keys(options.customLaunchers);
                break;
            case "1":
                // Test on SauceLabs
                options.reporters.push("saucelabs");
                options.concurrency = 2;
                options.customLaunchers = require("./browser-capabilities");
                Object.keys(options.customLaunchers).forEach(function(key) {
                    if (!key.includes("(SauceLabs)")) {
                        delete options.customLaunchers[key];
                    }
                });
                options.browsers = Object.keys(options.customLaunchers);
                break;
            case "2":
                break;
            case "3":
                break;
            default:
        }
    }
    config.set(options);
};
