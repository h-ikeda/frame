/*eslint-env node */

var m = require("mithril");

module.exports.view = function(vnode) {
    return m("#solufa", {
        oncreate: function(vn) {
            require("./renderer")("#solufa", require("./model"), "cam");
        },
        style: vnode.attrs.style
    });
};
