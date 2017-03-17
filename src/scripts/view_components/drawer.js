/*eslint-env node */

var m = require("mithril");
var mdc = require("material-components-web");
var drawer = null;

function setDrawer(dom) {
    drawer = new mdc.drawer.MDCTemporaryDrawer(dom);
}

function resetDrawer() {
    drawer = null;
}

function openDrawer() {
    if (drawer) {
        drawer.open = true;
        drawer.drawer.getElementsByClassName("mdc-temporary-drawer--selected")[0].focus();
    }
}

function closeDrawer() {
    if (drawer) {
        drawer.open = false;
    }
}

var menuListItemComponent = {
    view: function(vnode) {
        var tag = "a.mdc-list-item";
        if (vnode.attrs.selected) {
             tag += ".mdc-temporary-drawer--selected";
        }
        return m(tag, {
            href: "#",
            onclick: function() {
                vnode.attrs.onselect();
            }
        }, [
            m("i.material-icons.mdc-list-item__start-detail", vnode.attrs.icon),
            vnode.attrs.label
        ]);
    }
};

var menuListComponent = {
    view: function(vnode) {
        return m(".mdc-list", vnode.attrs.menuList.map(function(item, i) {
            return m(menuListItemComponent, {
                label: item.label,
                icon: item.icon,
                key: i,
                selected: vnode.attrs.selectedIndex === i,
                onselect: function() {
                    vnode.attrs.onselect(this.key);
                }
            });
        }));
    }
};

var menuListGroupsComponent = {
    view: function(vnode) {
        return m(".mdc-list-group", vnode.attrs.menuListGroups.map(function(group, i) {
            return [m("h3.mdc-list-group__subheader", {key: -i}, group.category),
                m(menuListComponent, {
                    menuList: group.menuList,
                    selectedIndex: vnode.attrs.selected[0] === i ? vnode.attrs.selected[1] : -1,
                    key: i,
                    onselect: function(index) {
                        vnode.attrs.onselect(this.key, index);
                    }
                })
            ];
        }).reduce(function(a, b) {
            return a.concat(b);
        }));
    }
};

var commandMenusComponent = {
    view: function(vnode) {
        return m(".mdc-list", vnode.attrs.menuList.map(function(menu, i) {
            return m(menuListItemComponent, {
                label: menu.label,
                icon: menu.icon,
                key: i,
                onselect: function() {
                    vnode.attrs.onclick(this.key);
                }
            });
        }));
    }
};

module.exports.view = function(vnode) {
    return m("aside.mdc-temporary-drawer.mdc-typography", {
        oncreate: function(vn) {
            setDrawer(vn.dom);
        },
        onremove: resetDrawer
    }, [
        m("nav.mdc-temporary-drawer__drawer", [
            m("header.mdc-temporary-drawer__header", [
                m(".mdc-temporary-drawer__header-content", [
                    "Frame"
                ])
            ]),
            m("nav.mdc-temporary-drawer__content", [
                m(menuListGroupsComponent, {
                    menuListGroups: vnode.attrs.menuGroups,
                    selected: vnode.attrs.selected,
                    onselect: function(groupIndex, menuIndex) {
                        closeDrawer();
                        vnode.attrs.onselect(groupIndex, menuIndex);
                    }
                }),
                m("hr.mdc-list-divider"),
                m(commandMenusComponent, {
                    menuList: vnode.attrs.commands,
                    onclick: function(commandIndex) {
                        closeDrawer();
                        vnode.attrs.onclick(commandIndex);
                    }
                }),
                m(".mdc-temporary-drawer__toolbar-spacer")
            ]),
        ])
    ]);
};

module.exports.open = openDrawer;
module.exports.close = closeDrawer;