"use strict";

const request = require("sync-request");
const availables = {};

const bsArray = JSON.parse(request("GET", "https://api.browserstack.com/4/browsers?flat=true", {
    headers: {
        authorization: "Basic " + Buffer.from(process.env.BROWSER_STACK_USERNAME + ":" + process.env.BROWSER_STACK_ACCESS_KEY).toString("base64")
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
    availables[`${cap.long_name} ${cap.long_version} on ${cap.os} (SauceLabs)`] = {
        browserName: cap.api_name,
        version: cap.long_version,
        platform: cap.os,
        base: "SauceLabs"
    };
});

function compareVersion(version1, version2) {
    const v1 = version1.split(".");
    const v2 = version2.split(".");
    let result = 0;
    v1.some(function(v, index) {
        if (parseInt(v, 10) > parseInt(v2[index], 10)) {
            result = -1;
            return true;
        } else if (parseInt(v, 10) < parseInt(v2[index], 10)) {
            result = 1;
            return true;
        }
    });
    return result;
}

// Latest version から targetVersions 分のバージョンをテストします。
// targetVersions = 2 で dev, beta, 60, 59, 58, 57 が存在する場合、60, 59 をテスト。 
const targetVersions = 2;

// テスト対象を正規表現で抽出。
// ex) Google Chrome 60.0.3112.78 on Windows 2008 (SauceLabs)
[
    // SauceLabs capabilities
    /chrome ([\.\d]+).* windows 2008 .*\(SauceLabs\)/i,
    /firefox ([\.\d]+).* windows 2008 .*\(SauceLabs\)/i,
    /internet explorer (11.[\.\d]+).* windows 2008 .*\(SauceLabs\)/i, // IEは11のみ。
    /chrome ([\.\d]+).* windows 10 .*\(SauceLabs\)/i,
    /firefox ([\.\d]+).* windows 10 .*\(SauceLabs\)/i,
    /internet explorer ([\.\d]+).* windows 10 .*\(SauceLabs\)/i,
    /chrome ([\.\d]+).* mac 10\.12 .*\(SauceLabs\)/i, // Sierra
    /firefox ([\.\d]+).* mac 10\.12 .*\(SauceLabs\)/i, // Sierra
    // BrowserStack capabilities
    /opera ([\.\d]+).* windows 7 .*\(BrowserStack\)/i,
    /edge ([\.\d]+).* windows 10 .*\(BrowserStack\)/i,
    /chrome ([\.\d]+).* os x el capitan .*\(BrowserStack\)/i,
    /firefox ([\.\d]+).* os x el capitan .*\(BrowserStack\)/i,
    /opera ([\.\d]+).* os x sierra .*\(BrowserStack\)/i,
    /opera ([\.\d]+).* os x el capitan .*\(BrowserStack\)/i,
    /safari ([\.\d]+).* os x sierra .*\(BrowserStack\)/i,
    /safari ([\.\d]+).* os x el capitan .*\(BrowserStack\)/i,
].forEach(function(rex) {
    Object.keys(availables).filter(function(key) {
        return rex.test(key) && !key.includes("beta");
    }).sort(function(key1, key2) {
        return compareVersion(rex.exec(key1)[1], rex.exec(key2)[1]);
    }).slice(0, targetVersions).forEach(function(key) {
        module.exports[key] = availables[key];
    });
});
