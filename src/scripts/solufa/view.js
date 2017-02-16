/*eslint-env node */

var m = require("mithril");

module.exports.view = function() {
    return m("#solufa.pe-fit", {
        config: function(domElement, isInitialized) {
            if (!isInitialized) {
                require("./renderer")(domElement, require("./model"), "cam");
            }
        }
    });
};