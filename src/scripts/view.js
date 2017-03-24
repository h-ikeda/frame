/*eslint-env node */

var m = require("mithril");

var viewMode = [1, 0];
var documentTitle = "Demo";
var titleEdit = false;

function openMenu() {
    require("./view_components/drawer").open();
}

function load() {
    if (viewMode[0] === 1) {
        var ref = require("./firebase_ref").ref.child(require("./define_structure")[viewMode[0]].menuList[viewMode[1]].id);
        var headers = require("./define_structure")[viewMode[0]].menuList[viewMode[1]].columns;
        require("./view_components/table").setRef(ref, headers);
    } else {
        require("./view_components/snackbar").show({
            message: "The feature is now preparing..."
        });
    }
}
load();

module.exports.view = function() {
    return [
        m(require("./view_components/toolbar"), {
            title: documentTitle,
            titleEdit: titleEdit,
            onEdit: function() {
                titleEdit = true;
            },
            onChange: function(newTitle) {
                documentTitle = newTitle;
                titleEdit = false;
            },
            openMenu: openMenu
        }),
        m(require("./view_components/drawer"), {
            menuGroups: require("./define_structure"),
            selected: viewMode,
            onselect: function(groupIndex, menuIndex) {
                viewMode = [groupIndex, menuIndex];
                load();
            },
            commands: require("./define_commands"),
            onclick: function(commandIndex) {
                require("./define_commands")[commandIndex].command();
            }
        }),
        m("main.mdc-toolbar-fixed-adjust.flex", [
            m(require("./view_components/table")),
            m(require("./view_components/graphic_view/canvas"), {
                ref: require("./firebase_ref").ref
            })
        ]),
        m(require("./view_components/fab"), {
            onclick: function() {
                require("./calc")();
            }
        }),
        m(require("./view_components/snackbar"))
    ];
};