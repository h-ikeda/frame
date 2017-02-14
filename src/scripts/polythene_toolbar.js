/*eslint-env node */

var m = require("mithril");
var toolbar = require("polythene/toolbar/toolbar");
require("polythene/layout/theme/theme");

var iconButton = require("polythene/icon-button/icon-button");

module.exports.view = m(toolbar, {
    content: [

        // Menu
        m(iconButton, {
            icon: {
                msvg: require("mmsvg/google/msvg/navigation/menu")
            }
        }),

        // Title
        m("span.flex", "Frame"),

        // Authentication
        m(iconButton, {
            icon: {
                msvg: require("mmsvg/google/msvg/action/account-circle")
            }
        })

    ]
});