/*eslint-env node */

var m = require("mithril");
var tabs = require("./view_components/tabs");

tabs.setTabs(require("./headers"));

tabs.onClick(function(newIndex) {
    var h = require("./headers")[newIndex];
    require("./view_components/table").setRef(require("./firebase_ref").child(h.field), h.columns);
});

module.exports.view = function() {
    return m(".layout.vertical.pe-fit", [
        m("", {style: {position: "relative"}}, [
            m(require("./view_components/toolbar")),
            m(require("polythene/shadow/shadow"), {z: 1})
        ]),
        m(".layout.horizontal.flex", {style: {position: "relative"}}, [
            m(".layout.vertical.flex", {style: {position: "relative"}}, [
                m(require("./view_components/tabs")),
                m(".flex", {style: {position: "relative"}}, [
                    m(require("./view_components/table"))
                ])
            ]),
            m(".flex", {style: {position: "relative"}}, [
                m(require("./solufa/view")),
                m("", {style: {position: "absolute", right: "10px", bottom: "10px"}}, [
                    m(require("./view_components/calculation"))
                ])
            ])
        ])
    ]);
};