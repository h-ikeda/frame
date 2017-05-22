import modules from "./modules";
import request from "superagent";

import modeldataInput from "../../test/model-sample";

export default {
    strict: process.env.NODE_ENV !== "production",
    state: {
        dataName: "Untitled",
        modeldataInput,
        modeldataResult: null,
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
        setDatabaseUser(state, newUser) {
            state.databaseUser = newUser;
        }
    },
    actions: {
        calculate({commit, state}) {
            request.post("https://nameless-falls-59671.herokuapp.com")
                .send(JSON.stringify({
                    jsonrpc: "2.0",
                    id: require("uuid/v4")(),
                    method: "frame.calculate",
                    params: [state.modeldataInput]
                }))
                .end(function(err, res) {
                    if (err) {
                        var msg = "";
                        Object.keys(err.response).forEach(function(key) {
                            msg += key + ": " + err.response[key];
                        });
                        alert(msg);
                    }
                    else {
                        alert(res.text);
                    }
                });
        }
    },
    modules
};
