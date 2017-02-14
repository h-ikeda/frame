/*eslint-env node, jquery, browser*/
/*globals w2ui */

var ref;

var gridName = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
    v = c === "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
});

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

module.exports.view = document.createElement("div");

module.exports.setRef = function(newRef, newHeader) {
    w2ui[gridName].columns = newHeader;
    if (ref) {
        ref.off("value", readRef);
    }
    ref = newRef;
    ref.on("value", readRef);
};

$(module.exports.view).w2grid({
    name: gridName,
    show: {
        footer: true,
    },
    selectType: "cell",
    onChange: function(e) {
        ref.child(e.recid).child(this.columns[e.column].field).set(e.value_new);
    }
});

$(function() {
    w2ui[gridName].refresh();
});