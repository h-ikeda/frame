/*eslint-env node */
/*globals S */

var m = S.m;
var nodes = {};
var lines = {};

var ref = require("../firebase_ref");

ref.child("nodes").on("value", function(res) {
    m.startComputation();
    nodes = res.val();
    m.endComputation();
});

ref.child("lines").on("value", function(res) {
    m.startComputation();
    lines = res.val();
    m.endComputation();
});

function nodesList(){
    return Object.values(nodes);
}

function linesList(){
    return Object.values(lines).map(function(line){
        if (line.n1 in this && line.n2 in this) {
            var p1 = this[line.n1];
            var p2 = this[line.n2];
            return {pos1: p1, pos2: p2};
        }
        return false;
    }, nodes).filter(function(o) {
        return o;
    });
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

function displayedObjects() {
    var t = nodesList().map(function(pos) {
        return createPointsElement(pos, "#f00");
    });
    linesList().forEach(function(pos){
        this.push(createLineElement(pos.pos1, pos.pos2, "#0f0"));
    }, t);
    return t;
}

module.exports.view = function(ctrl) {
    return m("scene", [m("obj", displayedObjects()),
        m("cam#cam", {style: {posY: -20}})]);
};
