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
        options.coverageIstanbulReporter = {
            dir: "coverage/%browser%"
        };
    } else {
        options.singleRun = true;
        options.logLevel = config.LOG_ERROR;
        options.reporters.push("junit");
        options.junitReporter = {
            outputDir: process.env.CIRCLE_TEST_REPORTS + "/junit/"
        };
        options.coverageIstanbulReporter = {
            dir: process.env.CIRCLE_ARTIFACTS + "/coverage/%browser%"
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
                const bsCaps = require("browserstack-capabilities")(process.env.BROWSER_STACK_USERNAME, process.env.BROWSER_STACK_ACCESS_KEY);
                const capabilities = bsCaps.create([{
                    "browser": ["opera", "edge"],
                    "browser_version": "latest",
                    "os": "Windows",
                    "os_version": ["10", "7"]
                }, {
                    "browser": ["opera", "safari"],
                    "browser_version": "latest",
                    "os": "OS X",
                    "os_version": ["Sierra", "El Capitan"]
                }, {
                    "browser": ["firefox", "chrome"],
                    "browser_version": "latest",
                    "os": "OS X",
                    "os_version": ["El Capitan"]
                }]).filter((capability) => capability);
                const browsers = [];
                options.customLaunchers = {};
                capabilities.forEach((capability) => {
                    const browser = [
                        "os",
                        "os_version",
                        "browser",
                        "browser_version"
                    ].map((key) => capability[key]).join(" ");
                    browsers.push(browser);
                    capability.base = "BrowserStack";
                    options.customLaunchers[browser] = capability;
                });
                options.browsers = browsers;
                break;
            case "1":
                // Test on SauceLabs
                options.reporters.push("saucelabs");
                options.concurrency = 2;
                options.customLaunchers = {
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
                    },
                    "Firefox on Mac OSX 10.12": {
                        base: "SauceLabs",
                        browserName: "firefox",
                        version: "latest",
                        platform: "macOS 10.12"
                    },
                    "Chrome on Mac OSX 10.12": {
                        base: "SauceLabs",
                        browserName: "chrome",
                        version: "latest",
                        platform: "macOS 10.12"
                    }
                };
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
