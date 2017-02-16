/*eslint-env node */

var m = require("mithril");
var fab = require("polythene/fab/fab");

module.exports = m(fab, {
    icon: {
        msvg: require("mmsvg/google/msvg/navigation/arrow-forward")
    },
    events: {
        onclick: require("../calc")
    }
});