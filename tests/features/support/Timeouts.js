var defineSupportCode = require("cucumber").defineSupportCode;

defineSupportCode(function(context) {
  context.setDefaultTimeout(60 * 1000);
});
