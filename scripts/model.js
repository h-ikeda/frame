var model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 3.0, y: 0.0, z: 0.0 },
        { recid: 2, x: 0.0, y: 3.0, z: 0.0 },
        { recid: 3, x: 0.0, y: 0.0, z: 3.0 },
        { recid: 4, x: 3.0, y: 3.0, z: 0.0 },
        { recid: 5, x: 3.0, y: 0.0, z: 3.0 },
        { recid: 6, x: 0.0, y: 3.0, z: 3.0 },
        { recid: 7, x: 3.0, y: 3.0, z: 3.0 }
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0},
        { recid: 1, n1: 0, n2: 2, EA: 1.0},
        { recid: 2, n1: 0, n2: 3, EA: 1.0},
        { recid: 3, n1: 1, n2: 4, EA: 1.0},
        { recid: 4, n1: 1, n2: 5, EA: 1.0},
        { recid: 5, n1: 2, n2: 4, EA: 1.0},
        { recid: 6, n1: 2, n2: 6, EA: 1.0},
        { recid: 7, n1: 3, n2: 5, EA: 1.0},
        { recid: 8, n1: 3, n2: 6, EA: 1.0},
        { recid: 9, n1: 4, n2: 7, EA: 1.0},
        { recid: 10, n1: 5, n2: 7, EA: 1.0},
        { recid: 11, n1: 6, n2: 7, EA: 1.0},
        { recid: 12, n1: 0, n2: 4, EA:1.0},
        { recid:13, n1:0, n2:5, EA:1.0},
        { recid:14, n1:4, n2:5, EA:1.0},
        {recid:15,n1:0,n2:6,EA:1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:true, y:true, z:true, rx:false, ry:false, rz:false},
        { recid: 2, node:2, x:true, y:true, z:true, rx:false, ry:false, rz:false},
        {recid:3, node: 4, x:true, y:true, z:true, rx:false, ry:false, rz:false}
    ],
    nodeLoads: [
        {recid:0, node:3, x:10.0, y:0.0, z:0.0, rx:0.0, ry:0.0, rz:0.0}
    ],
    nodeFromId: function(id){
        return this.nodes.find(function(t){
            return t.recid === id;
        });
    },
    lineFromId: function(id){
        return this.lines.find(function(t){
            return t.recid === id;
        });
    },
    lineLength: function(id){
        var line = this.lineFromId(id);
        var n1 = this.nodeFromId(line.n1);
        var n2 = this.nodeFromId(line.n2);
        return Math.sqrt((n1.x-n2.x)**2 + (n1.y-n2.y)**2 + (n1.z-n2.z)**2);
    },
    lineVector: function(id){
        var line = this.lineFromId(id);
        var n1 = this.nodeFromId(line.n1);
        var n2 = this.nodeFromId(line.n2);
        return {x:n2.x-n1.x, y:n2.y-n1.y, z:n2.z-n1.z};
    }
};