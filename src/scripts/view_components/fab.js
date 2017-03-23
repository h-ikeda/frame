/*eslint-env node */

require("@material/button/mdc-button.scss");
require("@material/fab/mdc-fab.scss");
require("material-design-icons/iconfont/material-icons.css");
var m = require("mithril");

module.exports.view = function(vnode) {
        return m("button.mdc-fab.material-icons", {
                onclick: vnode.attrs.onclick
            }, m("span.mdc-fab__icon", "playlist_play")
        );
};