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
        return state.idArray.map((id) => {
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
        state.idArray = Object.keys(data).sort();
        state.selected = {};
    },
    addData(state, data) {
        state.data = {
            ...state.data,
            ...data
        }
        state.idArray.push(...Object.keys(data).sort());
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
        }
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
    }
};

export const actions = {
    setData({commit}, data) {
        commit("setData", data);
    },
    toggleSelect({commit, state}, id) {
        commit(state.selected[id] ? "unselect": "select", [id]);
    },
    toggleSelectAll({commit, getters}) {
        commit(getters.selectedAll ? "unselectAll": "selectAll");
    }
};
