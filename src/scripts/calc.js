/*eslint-env node*/

var ref = require("./firebase_ref");

function converted(obj) {
    var t = {};
    Object.keys(obj).forEach(function(key) {
        t[key] = Object.keys(obj[key]).map(function(k) {
            var u = obj[key][k];
            u.recid = parseInt(k, 10);
            return u;
        });
    });
    return t;
}

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
    name: 'displacements',
    header: 'Displacements',
    selectType: 'cell',
    columns: [{
        field: 'recid',
        caption: 'ID',
        size: '10%',
        sortable: true,
        resizable: true
    }, {
        field: 'x',
        caption: 'dx',
        size: '30%',
        sortable: true,
        resizable: true
    }, {
        field: 'y',
        caption: 'dy',
        size: '30%',
        sortable: true,
        resizable: true
    }, {
        field: 'z',
        caption: 'dz',
        size: '30%',
        sortable: true,
        resizable: true
    }]
});

module.exports = document.createElement('button');
module.exports.id = "calculate";
module.exports.innerHTML = "Calculate";

module.exports.addEventListener("click", function() {
    var btn = $(this).attr("disabled", true);
    ref.once("value", function(res) {
        var model = converted(res.val());
        $.ajax({
            type: "post",
            url: "http://jsonrpc-calculator.1stop-st.org",
            data: JSON.stringify({
                jsonrpc: "2.0",
                id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c === "x" ? r : r & 0x3 | 0x8;
                    return v.toString(16);
                }),
                method: "frame_calculate",
                params: [model]
            }),
            dataType: "json",
            contentType: false,
            success: function(response) {
                w2ui.displacements.records = parseResponse(response);
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
            },
            error: function() {
                w2popup.open({
                    title: 'Error',
                    body: 'Server error.'
                });
            },
            complete: function() {
                btn.attr('disabled', false);
            }
        });
    });
});
