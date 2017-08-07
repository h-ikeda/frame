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
                    slChrome: {
                        base: "SauceLabs",
                        browserName: "chrome",
                        platform: "Windows 7",
                        version: "35"
                    },
                    slFirefox: {
                        base: "SauceLabs",
                        browserName: "firefox",
                        version: "30"
                    },
                    slSafari: {
                        base: "SauceLabs",
                        browserName: "safari",
                        platform: "macOS 10.12",
                        version: "10.0"
                    },
                    slIE11: {
                        base: "SauceLabs",
                        browserName: "internet explorer",
                        platform: "Windows 8.1",
                        version: "11"
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
