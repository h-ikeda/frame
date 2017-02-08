/*eslint-env node */

var ref = require("./firebase_ref");
var model;

function converted(obj) {
    var t = {};
    Object.keys(obj).forEach(function(key) {
        t[key] = Object.keys(obj[key]).map(function(k) {
            var u = obj[key][k];
            u.recid = k;
            return u;
        });
    });
    return t;
}

function createTabs(obj) {
    return Object.keys(obj).map(function(key) {
        return {
            id: key,
            text: key
        };
    });
}

ref.on("value", function(res){
    model = converted(res.val());
    var t = w2ui['tabs'];
    t.tabs = createTabs(model);
    var f = true;
    t.tabs.forEach(function(tab) {
        if (tab.id === t.active) {
            f = false;
        }
    });
    if (f) {
        t.active = t.tabs[0].id;
    }
    t.refresh();
    var g =w2ui['grid'];
    g.columns = columnHeaders(model[t.active][0]);
    g.records = model[t.active];
    g.refresh();
});

var tabs = document.createElement("div");
$(tabs).w2tabs({
    name: "tabs",
    onClick: function(e){
        var g = w2ui['grid'];
        g.columns = columnHeaders(model[e.target][0]);
        g.records = model[e.target];
        g.refresh();
    }
});

function columnHeaders(obj) {
    return Object.keys(obj).map(function(key) {
        return {
            field: key,
            caption: key,
            size: "10%"};
    });
}

var grid = document.createElement("div");
grid.style.height = "80%";
$(grid).w2grid({
    name: "grid",
    show: {
        footer: true,
    },
    selectType: "cell"
});

$(function(){
    w2ui['grid'].refresh();
});

var wrapper = document.createElement("div");
wrapper.appendChild(tabs);
wrapper.appendChild(grid);
module.exports = wrapper;
