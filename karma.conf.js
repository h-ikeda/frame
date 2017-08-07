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

    if (!process.env.CIRCLECI) {
        options.reporters.push("progress");
    } else {
        options.singleRun = true;
        options.logLevel = config.LOG_ERROR;
        options.reporters.push("junit");
        options.junitReporter = {
            outputDir: process.env.CIRCLE_TEST_REPORTS + "/junit/"
        };
        options.concurrency = 1;
        options.browserNoActivityTimeout = 240000;
        options.browserDisconnectTolerance = 1;
        options.browserDisconnectTimeout = 10000;
        options.captureTimeout = 240000;
        
        options.browserStack = {
            project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH
        };
        
        let customLaunchers = {};

        switch (process.env.CIRCLE_NODE_INDEX) {
            case "0":
                // Test on BrowserStack
                options.reporters.push("BrowserStack");
                const bsCaps = require("browserstack-capabilities")(process.env.BROWSER_STACK_USERNAME, process.env.BROWSER_STACK_ACCESS_KEY);
                const capabilities = bsCaps.create([{
                    "browser": ["opera", "edge"],
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
                options.customLaunchers = customLaunchers;
                options.browsers = browsers;
                break;
            case "1":
                // Test on SauceLabs
                options.reporters.push("saucelabs");
                customLaunchers = {
                    "Chrome on Windows 7": {
                        base: "SauceLabs",
                        browserName: "chrome",
                        version: "latest",
                        platform: "Windows 7"
                    },
                    "Firefox on Windows 7": {
                        base: "SauceLabs",
                        browserName: "firefox",
                        version: "latest",
                        platform: "Windows 7"
                    },
                    "Internet Explorer 11 on Windows 7": {
                        base: "SauceLabs",
                        browserName: "internet explorer",
                        version: "11",
                        platform: "Windows 7"
                    },
                    "Internet Explorer 11 on Windows 10": {
                        base: "SauceLabs",
                        browserName: "internet explorer",
                        version: "11",
                        platform: "Windows 10"
                    },
                    "Chrome on Windows 10": {
                        base: "SauceLabs",
                        browserName: "chrome",
                        version: "latest",
                        platform: "Windows 10"
                    },
                    "Firefox on Windows 10": {
                        base: "SauceLabs",
                        browserName: "firefox",
                        version: "latest",
                        platform: "Windows 10"
                    }
                };
                options.customLaunchers = customLaunchers;
                options.browsers = Object.keys(customLaunchers);
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
