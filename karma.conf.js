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
        options.reporters.push("junit", "BrowserStack", "saucelabs");
        options.junitReporter = {
            outputDir: process.env.CIRCLE_TEST_REPORTS + "/junit/"
        };
        options.concurrency = 1;
        options.browserNoActivityTimeout = 30000;
        options.browserDisconnectTolerance = 3;
        
        options.browserStack = {
            project: process.env.CIRCLE_PROJECT_REPONAME + "_" + process.env.CIRCLE_BRANCH
        };
        
        let customLaunchers = {};

        switch (process.env.CIRCLE_NODE_INDEX) {
            case "0":
                // Test on BrowserStack
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
                customLaunchers = {
                    sl_chrome: {
                        base: 'SauceLabs',
                        browserName: 'chrome',
                        platform: 'Windows 7',
                        version: '35'
                    },
                    sl_firefox: {
                        base: 'SauceLabs',
                        browserName: 'firefox',
                        version: '30'
                    },
                    sl_ios_safari: {
                        base: 'SauceLabs',
                        browserName: 'iphone',
                        platform: 'OS X 10.9',
                        version: '7.1'
                    },
                    sl_ie_11: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 8.1',
                        version: '11'
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
