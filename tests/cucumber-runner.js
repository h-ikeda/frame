#!/usr/bin/env node
var child_process = require("child_process");
var config = require("./browserstack_config.js");

for(var i in config.capabilities){
  var env = Object.create( process.env );
  env.TASK_ID = i.toString();
  var p = child_process.spawn("cucumber-js", ["tests/features"], { env: env } );  
  p.stdout.pipe(process.stdout);
}
