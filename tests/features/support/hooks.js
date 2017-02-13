var defineSupportCode = require("cucumber").defineSupportCode;

var webdriver = require("selenium-webdriver");
var browserstack = require("browserstack-local");

var createBrowserStackSession = function(config, caps){
  return new webdriver.Builder().
    usingServer("http://"+config.server+"/wd/hub").
    withCapabilities(caps).
    build();
};

var config = {
    server: "hub-cloud.browserstack.com",
    capabilities: [
        {
            browserName: "Chrome",
            browserVersion: "56.0",
            os: "Windows",
            os_vertion: "10",
            resolution: "1024x768"
        },
        {
            browserName: "firefox",
            browserVersion: "52.0 beta",
            os: "Windows",
            os_vertion: "10",
            resolution: "1024x768"
        },
        {
            browserName: "IE",
            browserVersion: "11.0",
            os: "Windows",
            os_vertion: "10",
            resolution: "1024x768"
        },
        {
            browserName: "Edge",
            browserVersion: "14.0",
            os: "Windows",
            os_vertion: "10",
            resolution: "1024x768"
        },
        {
            browserName: "Safari",
            browserVersion: "10.0",
            os: "OS X",
            os_vertion: "Sierra",
            resolution: "1024x768"
        },
        {
            browserName: "Firefox",
            browserVersion: "52.0 beta",
            os: "OS X",
            os_vertion: "Sierra",
            resolution: "1024x768"
        },
        {
            browserName: "Chrome",
            browserVersion: "56.0",
            os: "OS X",
            os_vertion: "Sierra",
            resolution: "1024x768"
        },
        {
            browserName: "Opera",
            browserVersion: "12.15",
            os: "OS X",
            os_vertion: "Sierra",
            resolution: "1024x768"
        },
        {
            browserName: "iPhone",
            platform: "MAC",
            device: "iPhone 6S Plus"
        },
        {
            browserName: "iPad",
            platform: "MAC",
            device: "iPad Mini 4"
        },
        {
            browserName: "iPad",
            platform: "MAC",
            device: "iPad Pro"
        },
        {
            browserName: "iPad",
            platform: "MAC",
            device: "iPad Air 2"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "Samsung Galaxy S5"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "HTC One M8"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "Motorola Razr"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "Sony Xperia Tipo"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "Google Nexus 5"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "Amazon Kindle Fire 2"
        },
        {
            browserName: "android",
            platform: "ANDROID",
            device: "Samsung Galaxy Tab 4 10.1"
        }
    ]
};

var username = process.env.BS_USERNAME || config.user;
var accessKey = process.env.BS_AUTHKEY || config.key;
var build = process.env.CIRCLE_BUILD_NUM;
var project = process.env.CIRCLE_PROJECT_REPONAME + "-" + process.env.CIRCLE_BRANCH;
var browserstack_local = true;
var taskId = 0;

defineSupportCode(function(context) {
  var before = context.Before;
  var after = context.After;
  var bsLocal = null;

  before(function (scenario, callback) {
    var world = this;
    var caps = config.capabilities[taskId];
    caps["browserstack.user"] = username;
    caps["browserstack.key"] = accessKey;
    caps["build"] = build;
    caps["project"] = project;
    caps["browserstack.local"] = browserstack_local;

    if(caps["browserstack.local"]){
      // Code to start browserstack local before start of test and stop browserstack local after end of test
      bsLocal = new browserstack.Local();
      bsLocal.start({key: accessKey}, function(error) {
        if (error) {
          throw new Error("Error at starting browserstack local.");
        }
        world.driver = createBrowserStackSession(config, caps);
        callback();
      });
    }
    else {
      world.driver = createBrowserStackSession(config, caps);
      callback();
    }
  });

  after(function(scenario, callback){
    ++taskId;
    this.driver.quit().then(function(){
      if(bsLocal){
        bsLocal.stop(callback);
      }
      else {
        callback();
      }
    });
  });
});
