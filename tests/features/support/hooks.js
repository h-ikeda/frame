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
            browserName: "chrome",
            build: process.env.CIRCLE_BUILD_NUM,
            project: process.env.CIRCLE_PROJECT_REPONAME + "-" + process.env.CIRCLE_BRANCH,
            "browserstack.local": true
        }
    ]
};

var username = process.env.BS_USERNAME || config.user;
var accessKey = process.env.BS_AUTHKEY || config.key;

defineSupportCode(function(context) {
  var before = context.Before;
  var after = context.After;
  var bsLocal = null;

  before(function (scenario, callback) {
    var world = this;
    var taskId = parseInt(process.env.TASK_ID || 0, 10);
    var caps = config.capabilities[taskId];
    caps["browserstack.user"] = username;
    caps["browserstack.key"] = accessKey;

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
