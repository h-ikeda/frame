import {MDCRipple} from "@material/ripple";
import uuid from "uuid/v4";

const className = "mdc-ripple-surface";
const propertyName = uuid();

function addRipple(el) {
    el.classList.add(className);
    el[propertyName] = new MDCRipple(el);
}

function removeRipple(el) {
    el[propertyName].destroy();
    delete el[propertyName];
    el.classList.remove(className);
}

function effective(value) {
    return typeof value === "undefined" || value;
}

export default {
    bind(el, binding) {
        if (effective(binding.value)) {
            addRipple(el);
        }
    },
    update(el, binding) {
        if (!effective(binding.oldValue) && effective(binding.value)) {
            addRipple(el);
        } else if (effective(binding.oldValue) && !effective(binding.value)) {
            removeRipple(el);
        }
    },
    unbind(el) {
        if (el[propertyName]) {
            removeRipple(el);
        }
    }
};
