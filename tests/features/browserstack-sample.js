/*eslint-env node */
var Cucumber = require('cucumber');
var assert = require('cucumber-assert');
var webdriver = require('selenium-webdriver');

Cucumber.defineSupportCode(function({setDefaultTimeout}) {
  setDefaultTimeout(60 * 1000);
});

Cucumber.defineSupportCode(function(context) {
  var When = context.When;
  var Then = context.Then;
  
  function createBrowserStackSession(config, caps){
    return new webdriver.Builder().
      usingServer('http://'+config.server+'/wd/hub').
      withCapabilities(caps).
      build();
  }

  var config = {
    server: 'hub-cloud.browserstack.com',
    capabilities: [{
      browserName: 'chrome',
      build: process.env.CIRCLE_BUILD_NUM,
      project: process.env.CIRCLE_PROJECT_REPONAME + '-' + process.env.CIRCLE_BRANCH
    }]
  };

  var task_id = parseInt(process.env.TASK_ID || 0, 10);
  var caps = config.capabilities[task_id];
  caps['browserstack.user'] = process.env.BS_USERNAME || config.user;
  caps['browserstack.key'] = process.env.BS_AUTHKEY || config.key;

  var driver = createBrowserStackSession(config, caps);

  ///// Your step definitions /////
  //
  // use 'Given', 'When' and 'Then' to declare step definitions
  //

  When(/^I type query as "([^"]*)"$/, function (searchQuery, next) {
    driver.get('https://www.google.com/ncr');
    driver.findElement({ name: 'q' })
      .sendKeys(searchQuery + '\n').then(next);
  });

  Then(/^I submit$/, function (next) {
    driver.findElement({ name: 'btnG' })
      .click()
      .then(function() {
        driver.wait(webdriver.until.elementLocated(webdriver.By.id('top_navi')), 5000);
        next();
      });
  });
  
  driver.quit();

});
