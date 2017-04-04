/*eslint-env node */

import "material-components-web/material-components-web.scss";
import "./view.scss";
import m from "mithril";
import toolbar from "./components/toolbar";
import drawer from "./components/drawer";

var viewMode = [1, 0];
var documentTitle = "Demo";
var titleEdit = false;
var menuOpen = false;
var dialogContent = {body: ""};

function popUpDialog(content) {
    dialogContent = content;
    m.redraw();
    require("./components/dialog").show();
}

function signIn() {
    var email = "";
    var password = "";
    popUpDialog({
        body: [
            m("input", {
                type: "email",
                value: email,
                onchange: m.withAttr("value", function(value) {
                    email = value;
                })
            }),
            m("input", {
                type: "password",
                value: password,
                onchange: m.withAttr("value", function(value) {
                    password = value;
                })
            })
        ],
        footer: ["Cancel", "Log In"],
        onaccept: function() {
            require("../database/firebase_ref").signIn(email, password);
        }
    });
}

function load() {
    if (viewMode[0] === 1) {
        var ref = require("../database/firebase_ref").ref.child(require("../definitions/data-structure")[viewMode[0]].menuList[viewMode[1]].id);
        var headers = require("../definitions/data-structure")[viewMode[0]].menuList[viewMode[1]].columns;
        require("./components/data-table").setRef(ref, headers);
    } else {
        require("./components/snackbar").show({
            message: "The feature is now preparing..."
        });
    }
}

require("../database/firebase_ref").onRefChanged = function() {
    load();
    m.redraw();
};
require("../database/firebase_ref").signInAnonymously();

module.exports.view = function() {
    return m("", [
        m(toolbar, {
            editMode: titleEdit,
            onTitleChange: function(newTitle) {
                documentTitle = newTitle;
                titleEdit = false;
            },
            onMenuClick() {menuOpen = true;},
            onLogIn: () => {}
        }, documentTitle),
        m(drawer, {
            menuGroups: require("../definitions/data-structure"),
            selected: viewMode,
            onselect(groupIndex, menuIndex) {
                viewMode = [groupIndex, menuIndex];
                menuOpen = false;
                load();
            },
            commands: require("../definitions/commands"),
            onclick(commandIndex) {
                menuOpen = false;
                require("../definitions/commands")[commandIndex].command();
            },
            open: menuOpen
        }),
        m("main.mdc-toolbar-fixed-adjust.flex", [
            m(require("./components/data-table")),
            m(require("./components/canvas"), {
                ref: require("../database/firebase_ref").ref
            })
        ]),
        m(require("./components/fab"), {
            onclick() {
                require("../proc/calc")();
            }
        }),
        m(require("./components/snackbar"))
    ]);
};
