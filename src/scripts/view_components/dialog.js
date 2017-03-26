/*eslint-env node */

require("@material/dialog/mdc-dialog.scss");
require("@material/button/mdc-button.scss");
var MDCDialog = require("@material/dialog").MDCDialog;
var m = require("mithril");

var dialog = null;

function setDialog(dom) {
    dialog = new MDCDialog(dom);
}

function resetDialog() {
    dialog = null;
}

function showDialog() {
    dialog.show();
}

var header = {
    view: function(vnode) {
        return m("header.mdc-dialog__header",
            m("h2.mdc-dialog__header__title", vnode.children)
        );
    }
};

var body = {
    view: function(vnode) {
        return m("section.mdc-dialog__body", vnode.children);
    }
};

var footerButton = {
    view: function(vnode) {
        return m("button.mdc-button.mdc-dialog__footer__button.mdc-dialog__footer__button--" + vnode.attrs.action, vnode.attrs.action === "accept" ? {
            onclick: vnode.attrs.onaccept
        } : {}, vnode.children);
    }
};

var footer = {
    view: function(vnode) {
        return m("footer.mdc-dialog__footer",
            ["cancel", "accept"].map(function(action, i) {
                if (Array.isArray(vnode.children) && vnode.children.length > i) {
                    return m(footerButton, {action: action, onaccept: vnode.attrs.onaccept}, vnode.children[i]);
                }
                if (i === 0 && !Array.isArray(vnode.children)) {
                    return m(footerButton, {action: action}, vnode.children);
                }
                return false;
            }).filter(function(elm) {
                return elm;
            })
        );
    }
};

var content = {
    view: function(vnode) {
        var t = [m(body, vnode.children)];
        if (typeof vnode.attrs.header !== "undefined") {
            t.unshift(m(header, vnode.attrs.header));
        }
        if (typeof vnode.attrs.footer !== "undefined") {
            t.push(m(footer, {onaccept: vnode.attrs.onaccept}, vnode.attrs.footer));
        }
        return t;
    }
};

module.exports = {
    oncreate: function(vnode) {
        setDialog(vnode.dom);
    },
    onremove: resetDialog,
    show: showDialog,
    view: function(vnode) {
        return m("aside", [
            m(".mdc-dialog__surface", m(content, vnode.attrs, vnode.children)),
            m(".mdc-dialog__backdrop")
        ]);
    }
};
