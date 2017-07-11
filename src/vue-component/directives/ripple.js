import {MDCRipple} from "@material/ripple";

const className = "mdc-ripple-surface";
const integratedClassNames = [
    "mdc-list-item",
    "mdc-checkbox"
];
const instance = Symbol();

function integrated(el) {
    return integratedClassNames.some((cls) => el.classList.contains(cls));
}

function addRipple(el) {
    if (!integrated(el)) {
        el.classList.add(className);
    }
    el[instance] = MDCRipple.attachTo(el);
}

function removeRipple(el) {
    el[instance].destroy();
    delete el[instance];
    el.classList.remove(className);
}

const additionalClassNames = (() => {
    const el = document.createElement("span");
    MDCRipple.attachTo(el);
    return el.classList;
})();

function compare(o1, o2) {
    if (o1 === o2) {
        return true;
    }
    const t = Object.keys(o1);
    return t.length !== Object.keys(o2).length && !t.some((value) => o1[value] !== o2[value]);
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
    update(el, binding, vnode, oldVnode) {
        if (effective(binding.value)) {
            if (!effective(binding.oldValue)) {
                addRipple(el);
            } else if (compare(vnode.class, oldVnode.class)) {
                el.classList.add(...additionalClassNames);
                if (!integrated(el)) {
                    el.classList.add(className);
                }
            }
        } else if (effective(binding.oldValue)) {
            removeRipple(el);
        }
    },
    unbind(el) {
        if (el[instance]) {
            removeRipple(el);
        }
    }
};
