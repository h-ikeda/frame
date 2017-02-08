/*eslint-env node */

require("./css/frame.css");

var t = require("./scripts/w2ui_view");
t.style.width = "50%";
t.style.height = "100%";
document.body.appendChild(t);

t = require("./scripts/solufa_renderer.msx");
t.style.width = "50%";
t.style.height = "100%";
t.style.top = "0";
t.style.left = "50%";
t.style.position = "fixed";
document.body.appendChild(t);

t = require("./scripts/calc");
t.style.top = "0";
t.style.left = "50%";
t.style.margin = "10px";
t.style.position = "fixed";
document.body.appendChild(t);
