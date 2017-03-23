/*eslint-env node, jquery, browser*/
/*globals w2ui */

require("w2ui/w2ui.css");

var m = require("mithril");
var gridName = require("uuid/v4")();

module.exports.view = function() {
    return m("#" + gridName +".pe-fit");
};

var ref;

function readRef(response) {
    var grid = w2ui[gridName];
    var model = response.val();
    grid.records = Object.keys(model).map(function(key) {
        var t = model[key];
        t.recid = key;
        return t;
    });
    grid.refresh();
}

module.exports.setRef = function(newRef, newHeader) {
    $(function(){
        w2ui[gridName].columns = newHeader;
        if (ref) {
            ref.off("value", readRef);
        }
        ref = newRef;
        ref.on("value", readRef);
    });
};

$(function() {
    $("#" + gridName).w2grid({
        name: gridName,
        show: {
            footer: true,
        },
        selectType: "cell",
        onChange: function(e) {
            ref.child(e.recid).child(this.columns[e.column].field).set(e.value_new);
        }
    }).refresh();
});
