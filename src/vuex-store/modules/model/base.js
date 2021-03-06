export default class {

    constructor({state, getters, mutations, actions, modules} = {}) {
        this._state = state || {};
        this._getters = getters || {};
        this._mutations = mutations || {};
        this._actions = actions || {};
        this._modules = modules || {};
    }

    get namespaced() {
        return true;
    }

    get state() {
        let state = this._state;
        return {
            data: {},
            idArray: [],
            selected: {},
            hidden: {},
            ...(typeof state === "function" ? state(): state)
        };
    }

    get getters() {
        return {
            data: (state, getters) => Object.keys(this._modules).reduce((dataObject, moduleName) => {
                dataObject[moduleName] = getters[moduleName + "/data"];
                return dataObject;
            }, state.data),
            dataArray: (state, getters) => Object.keys(this._modules).map((moduleName) => ({
                id: moduleName,
                data: getters[moduleName + "/dataArray"]
            })).concat(state.idArray.map((id) => ({
                id,
                data: state.data[id],
                selected: state.selected[id]
            }))),
            selectedAll: (state) => !Object.keys(state.data).some((id) => !state.selected[id]),
            shownAll: (state) => !Object.keys(state.hidden).length,
            ...this._getters
        };
    }

    get mutations() {
        return {
            setData(state, data) {
                state.data = data;
                state.idArray = Object.keys(data).sort();
                state.selected = {};
            },
            mergeData(state, data) {
                state.data = {
                    ...state.data,
                    ...data
                };
                state.idArray.push(...Object.keys(data).filter((id) => !(id in state.data)).sort());
            },
            removeData(state, idArray) {
                const data = {
                    ...state.data
                };
                const selected = {
                    ...state.selected
                };
                idArray.forEach((id) => {
                    delete data[id];
                    delete selected[id];
                    state.idArray.splice(state.idArray.indexOf(id), 1);
                });
                state.data = data;
                state.selected = selected;
            },
            select(state, idArray) {
                const selected = {};
                idArray.forEach((id) => {
                    selected[id] = true;
                });
                state.selected = {
                    ...state.selected,
                    ...selected
                };
            },
            unselect(state, idArray) {
                const selected = {
                    ...state.selected
                };
                idArray.forEach((id) => {
                    delete selected[id];
                });
                state.selected = selected;
            },
            selectAll(state) {
                const selected = {};
                Object.keys(state.data).forEach((id) => {
                    selected[id] = true;
                });
                state.selected = selected;
            },
            unselectAll(state) {
                state.selected = {};
            },
            hide(state, idArray) {
                const hidden = {};
                idArray.forEach((id) => {
                    hidden[id] = true;
                });
                state.hidden = {
                    ...state.hidden,
                    ...hidden
                };
            },
            show(state, idArray) {
                const hidden = {
                    ...state.hidden
                };
                idArray.forEach((id) => {
                    delete hidden[id];
                });
                state.hidden = hidden;
            },
            hideAll(state) {
                const hidden = {};
                Object.keys(state.data).forEach((id) => {
                    hidden[id] = true;
                });
                state.hidden = hidden;
            },
            showAll(state) {
                state.hidden = {};
            },
            ...this._mutations
        };
    }

    get actions() {
        return {
            setData: ({commit, dispatch}, data) => {
                const t = {};
                Object.keys(data).forEach((key) => {
                    if (key in this._modules) {
                        dispatch(key + "/setData", data[key]);
                    } else {
                        t[key] = data[key];
                    }
                });
                commit("setData", t);
            },
            toggleSelect({commit, state}, id) {
                commit(state.selected[id] ? "unselect": "select", [id]);
            },
            toggleSelectAll({commit, getters}) {
                commit(getters.selectedAll ? "unselectAll": "selectAll");
            },
            toggleHidden({commit, state}, id) {
                commit(state.hidden[id] ? "show": "hide", [id]);
            },
            toggleShowAll({commit, getters}) {
                commit(getters.shownAll ? "hideAll": "showAll");
            },
            ...this._actions
        };
    }

    get modules() {
        return this._modules;
    }

}
