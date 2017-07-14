export const state = {
    data: {},
    idArray: [],
    selected: {}
};

export const getters = {
    //
    // data() は、
    // {
    //     id1: { データオブジェクト }
    //     id2: { データオブジェクト }
    //     ・
    //     ・
    //     ・
    // }
    // 形式のオブジェクトを返す。(各idは文字列)
    // 主に解析用JSONデータ作成時に呼ばれます。
    //
    data: (state) => state.data,
    //
    // dataArray() は、
    // [
    //     { id: "id1", selected: bool, data: { データオブジェクト }
    //     { id: "id2", selected: bool, data: { データオブジェクト }
    //     ・
    //     ・
    //     ・
    // ]
    // 形式の配列を返す。
    // 主にGUI表示用データとして呼ばれます。
    //
    dataArray(state) {
        state.idArray.map((id) => {
            return {
                id,
                selected: state.selected[id],
                data: state.data[id]
            };
        });
    },
    selectedAll: (state) => !Object.keys(state.data).some((id) => !state.selected[id])
};

export const mutations = {
    setData(state, data) {
        state.data = data;
    },
    add(state, {id, item}) {
        state.data = {
            ...state.data,
            id: item
        };
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
    setData({commit}, data) {
        commit("setData", data);
    },
    toggleSelect({commit, getters}, id) {
        commit(getters.isSelected(id) ? "unselect": "select", id);
    },
    toggleSelectAll({commit, getters}) {
        commit(getters.selectedAll ? "unselectAll": "selectAll");
    }
};
