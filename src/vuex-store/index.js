import modules from "./modules";
import uuid from "uuid/v4";
import xhr from "xhr";

import modeldataInput from "../../test/model-sample";

export default {
    strict: process.env.NODE_ENV !== "production",
    state: {
        dataName: "Untitled",
        modeldataInput,
        modeldataResult: null,
        xhrId: "",
        databaseUser: null
    },
    mutations: {
        setDataName(state, newName) {
            state.dataName = newName;
        },
        setModeldataInput(state, newInput) {
            state.modeldataInput = newInput;
        },
        setModeldataResult(state, newResult) {
            state.modeldataResult = newResult;
        },
        setXhrId(state, newId) {
            state.xhrId = newId;
        },
        setDatabaseUser(state, newUser) {
            state.databaseUser = newUser;
        }
    },
    actions: {
        calculate({commit, state}) {
            commit("setXhrId", uuid());
            xhr({
                url: "https://nameless-falls-59671.herokuapp.com",
                method: "POST",
                json: {
                    jsonrpc: "2.0",
                    id: state.xhrId,
                    method: "frame.calculate",
                    params: [state.modeldataInput]
                }
            }, (err, res, body) => {
                if (err) {
                    throw err;
                } else if (body.error) {
                    throw body.error;
                } else {
                    if (state.xhrId === body.id) {
                        commit("setModeldataResult", body.result);
                    }
                }
            });
        }
    },
    modules
};
