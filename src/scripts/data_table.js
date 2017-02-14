/*eslint-env node */

var m = require("mithril");

var tabs = require("./polythene_tabs");
tabs.onClick(function(newIndex, oldIndex) {
    var h = require("./headers")[newIndex];
    grid.setRef(require("./firebase_ref").child(h.field), h.columns);
});

var t = document.createElement("div");
m.mount(t, tabs.view);

var grid = require("./w2ui_grid");
grid.view.style.height = "calc(100% - 48px)";

var wrapper = document.createElement("div");
wrapper.appendChild(t);
wrapper.appendChild(grid.view);
module.exports = wrapper;
