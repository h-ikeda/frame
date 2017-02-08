/*eslint-env node */
/*globals S */

var m = S.m;
var data = {};

require("./firebase_ref").on("value", function(res) {
    m.startComputation();
    data = res.val();
    m.endComputation();
});

function nodes(){
    return "nodes" in data ? Object.values(data.nodes): [];
}

function lines(){
    return "lines" in data ? Object.values(data.lines).map(function(line){
        var p1 = this[line.n1];
        var p2 = this[line.n2];
        return {pos1: p1, pos2: p2};
    }, data.nodes): [];
}

function createPointsElement(pos, color) {
    if (Array.isArray(pos)) {
        var posArray = [];
        pos.forEach(function(p) {
            this.push(p.x, p.y, p.z);
        }, posArray);
        pos = posArray;
    } else {
        pos = [pos.x, pos.y, pos.z];
    }
    return m("points", {
        geo: {
            type: "Buffer",
            attrs: {
                position: pos
            }
        },
        mtl: {
            type: "Points",
            value: {
                color: color
            }
        }
    });
}

function createLineElement(pos1, pos2, color) {
    return m("line", {
        geo: {
            type: "Buffer",
            attrs: {
                position: [pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z]
            }
        },
        mtl: {
            type: "LineBasic",
            value: {
                color: color
            }
        }
    });
}

module.exports = {
    controller: function(){
        return {
            displayedObjects: function() {
                var t = nodes().map(function(pos) {
                    return createPointsElement(pos, "#f00");
                });
                lines().forEach(function(pos){
                    this.push(createLineElement(pos.pos1, pos.pos2, "#0f0"));
                }, t);
                return t;
            }
        };
    },
	view: function(ctrl) {
        return m("scene", [m("obj", ctrl.displayedObjects()),
            m("cam#cam", {style: {posY: -20}})]);
    }
};