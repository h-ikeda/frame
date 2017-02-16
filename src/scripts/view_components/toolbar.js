/*eslint-env node */

var m = require("mithril");
var toolbar = require("polythene/toolbar/toolbar");
var iconButton = require("polythene/icon-button/icon-button");

module.exports.view = function() {
    return m(toolbar, {
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
};