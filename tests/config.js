/*eslint-env node */

var finalhandler = require("finalhandler");
var serveStatic = require("serve-static")("dist");
var server = require("http").createServer(function onRequest(req, res) {
    serveStatic(req, res, finalhandler(req, res));
});

var browserstack = require("browserstack-local");
var bsLocal = new browserstack.Local();

var user = process.env.BS_USERNAME;
var key = process.env.BS_AUTHKEY;

var repo = process.env.CIRCLE_PROJECT_REPONAME;
var branch = process.env.CIRCLE_BRANCH;
var build = process.env.CIRCLE_BUILD_NUM;

var commonCapabilities = {
    "browserstack.local": true,
    build: build,
    project: repo + "_" + branch
};

var capabilities = [
    {
        "os": "Windows",
        "os_version": "10",
        "browser": "IE",
        "browser_version": "11.0",
        "resolution": "1024x768"
    }, {
        "os": "Windows",
        "os_version": "10",
        "browser": "Edge",
        "browser_version": "14.0",
        "resolution": "1024x768"
    }, {
        "os": "Windows",
        "os_version": "10",
        "browser": "Firefox",
        "browser_version": "53.0 beta",
        "resolution": "1024x768"
    }, {
        "os": "Windows",
        "os_version": "10",
        "browser": "Chrome",
        "browser_version": "56.0",
        "resolution": "1024x768"
    }, {
        "os": "OS X",
        "os_version": "Sierra",
        "browser": "Safari",
        "browser_version": "10.0",
        "resolution": "1024x768"
    }, {
        "os": "OS X",
        "os_version": "Sierra",
        "browser": "Firefox",
        "browser_version": "53.0 beta",
        "resolution": "1024x768"
    }, {
        "os": "OS X",
        "os_version": "Sierra",
        "browser": "Chrome",
        "browser_version": "56.0",
        "resolution": "1024x768"
    }/*, {
        "os": "OS X",
        "os_version": "Sierra",
        "browser": "Opera",
        "browser_version": "12.15",
        "resolution": "1024x768"
    }, {
        "browserName": "iPhone",
        "platform": "MAC",
        "device": "iPhone 6S"
    }, {
        "browserName": "iPhone",
        "platform": "MAC",
        "device": "iPhone 6S Plus"
    }, {
        "browserName": "iPad",
        "platform": "MAC",
        "device": "iPad Air 2"
    }, {
        "browserName": "iPad",
        "platform": "MAC",
        "device": "iPad Pro"
    }, {
        "browserName": "iPad",
        "platform": "MAC",
        "device": "iPad Mini 4"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Samsung Galaxy S5 Mini"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Samsung Galaxy S5"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "HTC One M8"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Motorola Razr Maxx HD"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Sony Xperia Tipo"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Google Nexus 5"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Amazon Kindle Fire HDX 7"
    }, {
        "browserName": "android",
        "platform": "ANDROID",
        "device": "Samsung Galaxy Tab 4 10.1"
    }*/
];

capabilities.forEach(function(cap) {
    for (var i in commonCapabilities) {
        if (commonCapabilities.hasOwnProperty(i)) {
            cap[i] = cap[i] || commonCapabilities[i];
        }
    }
});

exports.config = {
    user: user,
    key: key,
    specs: [
        "./tests/specs/**"
    ],
    capabilities: capabilities,
    maxInstances: 7,
    waitforTimeout: 10000,
    onPrepare: function(config){
        return new Promise(function(resolve, reject){
            server.listen(8080, function() {
                bsLocal.start({
                    "key": config.key
                }, function(error) {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
        });
    },
    onComplete: function () {
        bsLocal.stop(function() {
            server.close();
        });
    }
};
