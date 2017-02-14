/*eslint-env node */

var m = require("mithril");
var tabs = require("polythene/tabs/tabs");

var registeredOnClickFunctions = [];
module.exports.onClick = function(func) {
    registeredOnClickFunctions.push(func);    
};

var activeIndex = 0;

module.exports.view = m.component(tabs, {
    buttons: require("./headers").map(function(obj) {
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
