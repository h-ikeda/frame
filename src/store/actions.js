import superagent from "superagent";

export function openDrawerMenu({commit}) {
    commit("setDrawerMenuOpen", true);
};

export function closeDrawerMenu({commit}) {
    commit("setDrawerMenuOpen", false);
};

export function calculate({commit, state}) {
    var model = state.databaseConnection.model;
    console.log(model);
    superagent.post("https://nameless-falls-59671.herokuapp.com")
    .send(JSON.stringify({
        jsonrpc: "2.0",
        id: require("uuid/v4")(),
        method: "frame.calculate",
        params: [model]
    }))
    .end(function(err, res) {
        if (err) {
            var msg = "";
            Object.keys(err.response).forEach(function(key) {
                msg += key + ": " + err.response[key];
            });
            alert(msg);
        } else {
            alert(res.text);
        }
    });
};
