#!/usr/bin/env node
var child_process = require("child_process");
var config = require("./browserstack_config.js");

process.argv[0] = "node";
process.argv[1] = "cucumber-js";
process.argv[2] = "tests/features";

for(var i in config.capabilities){
  var env = Object.create( process.env );
  env.TASK_ID = i.toString();
  var p = child_process.spawn('/usr/bin/env', process.argv, { env: env } );  
  p.stdout.pipe(process.stdout);
}
