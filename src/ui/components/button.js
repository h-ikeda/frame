import m from "mithril";
import {MDCRipple} from "@material/ripple";

export default {
    oncreate(vnode) {
        MDCRipple.attachTo(vnode.dom);
    },
    view(vnode) {
        return m("button.mdc-button", vnode.attrs, vnode.children);
    }
};