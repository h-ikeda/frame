/*eslint-env node */

require("@material/toolbar/mdc-toolbar.scss");
require("@material/button/mdc-button.scss");
require("@material/textfield/mdc-textfield.scss");
require("material-design-icons/iconfont/material-icons.css");
var m = require("mithril");

var commandIconButton = {
    view: function(vnode) {
        return m("button.mdc-button.mdc-button--compact.material-icons", {
            onclick: vnode.attrs.onclick
        }, vnode.attrs.icon);
    }
};

var commandLabelButton = {
    view: function(vnode) {
        return m("button.mdc-button.mdc-button--compact", {
            onclick: vnode.attrs.onclick
        }, vnode.attrs.label);
    }
};

var toolbarTitle = {
    view: function(vnode) {
        if (vnode.attrs.edit) {
            return m("span.mdc-textfield",
                m("input.mdc-textfield__input.mdc-toolbar__title", {
                    onchange: m.withAttr("value", vnode.attrs.onchange),
                    onblur: function(e) {
                        this.onchange(e);
                    },
                    value: vnode.attrs.title,
                    oncreate: function(vn) {
                        vn.dom.focus();
                    }
                })
            );
        }
        return m("span.mdc-toolbar__title", {
            onclick: vnode.attrs.onclick
        }, vnode.attrs.title);
    }
};

module.exports.view = function(vnode) {
    return m("header.mdc-toolbar.mdc-toolbar--fixed", [
        m("section.mdc-toolbar__section.mdc-toolbar__section--align-start", [
            m(commandIconButton, {
                icon: "menu",
                onclick: vnode.attrs.openMenu
            }),
            m(toolbarTitle, {
                title: vnode.attrs.title,
                edit: vnode.attrs.titleEdit,
                onclick: vnode.attrs.onEdit,
                onchange: vnode.attrs.onChange
            })
        ]),
        m("section.mdc-toolbar__section.mdc-toolbar__section--align-end", [
            m(commandLabelButton, {
                label: "Log In",
                onclick: vnode.attrs.logIn
            })
        ])
    ]);
};