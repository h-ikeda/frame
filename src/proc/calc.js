/*eslint-env node*/

var ref = require("../database/firebase_ref");

function parseResponse(response) {
    var r = [];
    var d = response.result.displacements;
    for (var p in d) {
        if (d.hasOwnProperty(p)) {
            r.push({
                recid: p,
                x: d[p].x,
                y: d[p].y,
                z: d[p].z
            });
        }
    }
    return r;
}

$().w2grid({
    name: "displacements",
    header: "Displacements",
    selectType: "cell",
    columns: [{
        field: "recid",
        caption: "ID",
        size: "10%",
        sortable: true,
        resizable: true
    }, {
        field: "x",
        caption: "dx",
        size: "30%",
        sortable: true,
        resizable: true
    }, {
        field: "y",
        caption: "dy",
        size: "30%",
        sortable: true,
        resizable: true
    }, {
        field: "z",
        caption: "dz",
        size: "30%",
        sortable: true,
        resizable: true
    }]
});

module.exports = function() {
    ref.once("value", function(res) {
        var model = res.val();
        require("superagent")
            .post("https://nameless-falls-59671.herokuapp.com")
            .send(JSON.stringify({
                jsonrpc: "2.0",
                id: require("uuid/v4")(),
                method: "calculate",
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
                    w2ui.displacements.records = parseResponse(JSON.parse(res.text));
                    w2popup.open({
                        title: "Result",
                        body: "<div id=\"popup_res\" style=\"height:100%;width:100%\"></div>",
                        onOpen: function(e) {
                            e.onComplete = function(e) {
                                $("#popup_res").w2render("displacements");
                                w2ui.displacements.refresh();
                            };
                        }
                    });
                }
                //btn.attr('disabled', false);
            });
    });
};
