export const state = {
    ids: [],
    items: [],
    selected: []
};

export const getters = {
    data(state) {
        const t = {};
        state.ids.forEach((id, index) => {
            t[id] = state.items[index];
        });
        return t;
    },
    getItemById: (state) => (id) => state.items[state.ids.indexOf(id)],
    isSelected: (state) => (id) => state.selected.indexOf(id) >= 0,
    selectedAll: (state) => state.ids.length === state.selected.length
};

export const mutations = {
    add(state, {id, item}) {
        state.ids.push(id);
        state.items.push(item);
    },
    remove(state, id) {
        let index = state.ids.indexOf(id);
        state.ids.splice(index, 1);
        state.items.splice(index, 1);
        index = state.selected.indexOf(id);
        if (index >= 0) {
            state.selected.splice(index, 1);
        }
    },
    clear(state) {
        state.ids = [];
        state.items = [];
        state.selected = [];
    },
    select(state, id) {
        state.selected.push(id);
    },
    unselect(state, id) {
        state.selected.splice(state.selected.indexOf(id), 1);
    },
    selectAll(state) {
        state.selected = [...state.ids];
    },
    unselectAll(state) {
        state.selected = [];
    }
};

export const actions = {
    setData({commit}, {data, order}) {
        commit("clear");
        order.forEach((id) => {
            commit("add", {
                id,
                item: data[id]
            });
        });
    },
    toggleSelect({commit, getters}, id) {
        commit(getters.isSelected(id) ? "unselect": "select", id);
    },
    toggleSelectAll({commit, getters}) {
        commit(getters.selectedAll ? "unselectAll": "selectAll");
    }
};
