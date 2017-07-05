export default {
    namespaced: true,
    state() {
        return {
            id: [],
            x: [],
            y: [],
            z: [],
            selected: []
        };
    },
    getters: {
        getObjectById: (state) => (id) => {
            const index = state.id.indexOf(id);
            if (index < 0) {
                return;
            }
            return {
                x: state.x[index],
                y: state.y[index],
                z: state.z[index]
            };
        },
        isSelected: (state) => (id) => state.selected.indexOf(id) >= 0,
        indexOf: (state) => (id) => state.id.indexOf(id)
    },
    mutations: {
        clear(state) {
            state.id = [];
            state.x = [];
            state.y = [];
            state.z = [];
            state.selected = [];
        },
        add(state, data) {
            state.id.push(data.id);
            state.x.push(data.x);
            state.y.push(data.y);
            state.z.push(data.z);
        },
        remove(state, id) {
            const index = state.id.indexOf(id);
            if (index >= 0) {
                state.id.splice(index, 1);
                state.x.splice(index, 1);
                state.y.splice(index, 1);
                state.z.splice(index, 1);
                const selectedIndex = state.selected.indexOf(id);
                if (selectedIndex >= 0) {
                    state.selected.splice(selectedIndex, 1);
                }
            }
        },
        select(state, id) {
            if (state.selected.indexOf(id) < 0 && state.id.indexOf(id) >= 0) {
                state.selected.push(id);
            }
        },
        unselect(state, id) {
            const index = state.selected.indexOf(id);
            if (index >= 0) {
                state.selected.splice(index, 1);
            }
        }
    },
    actions: {
        setData({commit}, data) {
            commit("clear");

        }
    }
};
