"use strict";

const request = require("sync-request");
const availables = {};

const bsArray = JSON.parse(request("GET", "https://www.browserstack.com/automate/browsers.json", {
    headers: {
        authorization: "Basic " + Buffer(process.env.BROWSER_STACK_USERNAME + ":" + process.env.BROWSER_STACK_ACCESS_KEY).toString("base64")
    }
}).getBody());

bsArray.forEach(function(cap) {
    cap.base = "BrowserStack";
    if (cap.device) {
        // Mobile devices
        availables[`${cap.device} with ${cap.os} ${cap.os_version} (BrowserStack)`] = cap;
    } else {
        // Desktop browsers
        availables[`${cap.browser} ${cap.browser_version} on ${cap.os} ${cap.os_version} (BrowserStack)`] = cap;
    }
});

const slArray = JSON.parse(request("GET", "https://saucelabs.com/rest/v1/info/platforms/webdriver").getBody());

slArray.forEach(function(cap) {
    cap.base = "SauceLabs";
    availables[`${cap.long_name} ${cap.long_version} on ${cap.os} (SauceLabs)`] = {
        browserName: cap.api_name,
        version: cap.long_version,
        platform: cap.os
    };
});



module.exports = {
    // SauceLabs launchers
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
    },
    // BrowserStack launchers
    "Edge on Windows 10": {
        base: "BrowserStack",
        browser: "Edge",
        os: "Windows",
        os_version: "10",
        browser_version: "latest"
    },
    "Opera on Windows 7": {
        base: "BrowserStack",
        browser: "Opera",
        os: "Windows",
        os_version: "7",
        browser_version: "latest"
    },
    "Opera on Windows 10": {
        base: "BrowserStack",
        browser: "Opera",
        os: "Windows",
        os_version: "10",
        browser_version: "latest"
    },
    "Opera on Mac OS X Sierra": {
        base: "BrowserStack",
        browser: "Opera",
        os: "OS X",
        os_version: "Sierra",
        browser_version: "latest"
    },
    "Opera on Mac OS X El Capitan": {
        base: "BrowserStack",
        browser: "Opera",
        os: "OS X",
        os_version: "El Capitan",
        browser_version: "latest"
    },
    "Safari on Mac OS X Sierra": {
        base: "BrowserStack",
        browser: "Safari",
        os: "OS X",
        os_version: "Sierra",
        browser_version: "latest"
    },
    "Safari on Mac OS X El Capitan": {
        base: "BrowserStack",
        browser: "Safari",
        os: "OS X",
        os_version: "El Capitan",
        browser_version: "latest"
    },
    "Firefox on Mac OS X El Capitan": {
        base: "BrowserStack",
        browser: "Firefox",
        os: "OS X",
        os_version: "El Capitan",
        browser_version: "latest"
    },
    "Chrome on Mac OS X El Capitan": {
        base: "BrowserStack",
        browser: "Chrome",
        os: "OS X",
        os_version: "El Capitan",
        browser_version: "latest"
    }
};
