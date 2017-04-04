/*eslint-env node */

import m from "mithril";
import button from "./button";

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

export default {
    view(vnode) {
        return m("header.mdc-toolbar.mdc-toolbar--fixed", [
            m("section.mdc-toolbar__section.mdc-toolbar__section--align-start", [
                m(button, {
                    class: "mdc-button--compact material-icons",
                    onclick: vnode.attrs.onMenuClick
                }, "menu"),
                vnode.attrs.editMode ?
                    m("span.mdc-textfield",
                        m("input.mdc-textfield__input.mdc-toolbar__title", {
                            onchange: vnode.attrs.onTitleChange,
                            value: vnode.children
                        })
                    ): m("span.mdc-toolbar__title", {
                        onclick: vnode.onTitleClick
                    }, vnode.children)
            ]),
            m("section.mdc-toolbar__section.mdc-toolbar__section--align-end", [
                m(button, {
                    class: "mdc-button--compact",
                    onclick: vnode.attrs.onLoginClick
                }, "Log In")
            ])
        ]);
    }
};