/*eslint-env node */

require("./css/frame.css");
var m = require("mithril");

var t = document.createElement("div");
m.mount(t, require("./scripts/polythene_toolbar").view);
document.body.appendChild(t);

t = require("./scripts/data_table");
t.style.width = "50%";
t.style.height = "calc(100% - 64px)";
t.style.display = "inline-block";
document.body.appendChild(t);

t = require("./scripts/solufa_renderer.msx");
t.style.width = "50%";
t.style.height = "calc(100% - 64px)";
t.style.display = "inline-block";
document.body.appendChild(t);

t = require("./scripts/calc");
t.style.top = "74px";
t.style.left = "calc(50% + 10px)";
t.style.position = "fixed";
document.body.appendChild(t);
