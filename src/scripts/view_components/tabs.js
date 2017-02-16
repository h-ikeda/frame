/*eslint-env node */

var m = require("mithril");
var tabs = require("polythene/tabs/tabs");

var registeredOnClickFunctions = [];
module.exports.onClick = function(func) {
    registeredOnClickFunctions.push(func);    
};

var activeIndex = 0;
var curTabs = [];

module.exports.setTabs = function(newTabs) {
    m.startComputation();
    curTabs = newTabs;
    m.endComputation();
};

module.exports.view = function() {
    return m(tabs, {
        buttons: curTabs.map(function(obj) {
            return {label: obj.caption};
        }),
        getState: function(state) {
            registeredOnClickFunctions.forEach(function(func) {
                func(state.index, activeIndex);
            });
            activeIndex = state.index;
        },
        autofit: true
    });
};

