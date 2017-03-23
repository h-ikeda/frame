/*eslint-env node */

require("@material/snackbar/mdc-snackbar.scss");
var m = require("mithril");
var snackbar = null;

function createSnackbar(dom) {
    var mdc = require("material-components-web");
    snackbar = new mdc.snackbar.MDCSnackbar(dom);
}

function resetSnackbar() {
    snackbar = null;
}

function show(showObj) {
    if (snackbar) {
        snackbar.show(showObj);
    }
}

module.exports = {
    view: function() {
        return m(".mdc-snackbar", {
            oncreate: function(vnode) {
                createSnackbar(vnode.dom);
            },
            onremove: resetSnackbar
        }, [
            m(".mdc-snackbar__text"),
            m(".mdc-snackbar__action-wrapper", [
                m("button.mdc-button mdc-snackbar__action-button")
            ])
        ]);
    }
};

module.exports.show = show;