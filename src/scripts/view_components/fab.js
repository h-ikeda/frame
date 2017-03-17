/*eslint-env node */

var m = require("mithril");

module.exports.view = function(vnode) {
        return m("button.mdc-fab.material-icons", {
                onclick: vnode.attrs.onclick
            }, m("span.mdc-fab__icon", "playlist_play")
        );
};