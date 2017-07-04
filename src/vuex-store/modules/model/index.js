import {post} from "superagent";
import uuid from "uuid/v4";
import input from "./input";
import result from "./result";

export default {
    namespaced: true,
    state() {
        return {
            requestId: "",
            calculated: false,
            calculating: false,
            title: "Untitled"
        };
    },
    getters: {
        displayName: (_, getters) => (type) => {
            const i = type.indexOf("/");
            if (i < 0) {
                return type === "input" ? "Input": "Result";
            }
            return getters[type.slice(0, i) + "/displayName"](type.slice(i + 1));
        },
        displayIcon: (_, getters) => (type) => {
            const i = type.indexOf("/");
            if (i < 0) {
                throw "Input or Result has no icons.";
            }
            return getters[type.slice(0, i) + "/displayIcon"](type.slice(i + 1));
        },
        dataTypes: (_, getters) => getters["input/dataTypes"].map((type) => "input/" + type).concat(getters["result/dataTypes"].map((type) => "result/" + type))
    },
    mutations: {
        updateRequestId(state) {
            state.requestId = uuid();
        },
        setCalculated(state, calculated) {
            if (process.env.NODE_ENV !== "production" && typeof calculated !== "boolean") {
                throw "Calculated state should be a boolean.";
            }
            state.calculated = calculated;
        },
        setTitle(state, title) {
            if (process.env.NODE_ENV !== "production" && typeof title !== "string") {
                throw "Title should be a string.";
            }
            state.title = title;
        },
        setCalculating(state, calculating) {
            if (process.env.NODE_ENV !== "production" && typeof calculating !== "boolean" && typeof calculating !== "number") {
                throw "Calculating state should be a boolean or a number.";
            }
            state.calculating = calculating;
        }
    },
    actions: {
        // JSONRPC経由でリモートサーバーによる解析を実行します。
        calculate({commit, state}) {
            commit("setCalculated", false);
            commit("updateRequestId");
            commit("setCalculating", true);
            post("https://nameless-falls-59671.herokuapp.com").send({
                jsonrpc: "2.0",
                id: state.requestId,
                method: "frame.calculate",
                params: [state.input]
            }).then((res) => {
                const body = JSON.parse(res.text);
                if (body.id === state.requestId) {
                    commit("result/setData", body.result);
                    commit("setCalculated", true);
                }
                commit("setCalculating", false);
            }).catch(() => {
                commit("setCalculating", false);
            });
        }
    },
    modules: {
        input,
        result
    }
};
