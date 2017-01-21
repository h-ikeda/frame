var $ = require('jquery');

var model = {
    
};

$.extend(model, {
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
        { recid: 2, n1: 0, n2: 3, EA: 1.0},
        { recid: 4, n1: 1, n2: 5, EA: 1.0},
        { recid: 6, n1: 2, n2: 6, EA: 1.0},
        { recid: 7, n1: 3, n2: 5, EA: 1.0},
        { recid: 8, n1: 3, n2: 6, EA: 1.0},
        { recid: 9, n1: 4, n2: 7, EA: 1.0},
        { recid: 10, n1: 5, n2: 7, EA: 1.0},
        { recid: 11, n1: 6, n2: 7, EA: 1.0},
        { recid:13, n1:0, n2:5, EA:1.0},
        { recid:14, n1:4, n2:5, EA:1.0},
        {recid:15,n1:0,n2:6,EA:1.0},
        {recid:16,n1:4,n2:6,EA:1.0},
        {recid:17,n1:5,n2:6,EA:1.0},
        {recid:18,n1:3,n2:1,EA:1.0},
        {recid:19,n1:2,n2:7,EA:1.0},
        {recid:20,n1:2,n2:3,EA:1.0},
        {recid:21,n1:1,n2:7,EA:1.0},
        {recid:22,n1:3,n2:7,EA:1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx:true, ry:true, rz:true},
        { recid: 1, node: 1, x:true, y:true, z:true, rx:true, ry:true, rz:true},
        { recid: 2, node: 2, x:true, y:true, z:true, rx:true, ry:true, rz:true},
        { recid: 3, node: 4, x:true, y:true, z:true, rx:true, ry:true, rz:true},
        { recid: 4, node: 3, x:0, y:0, z:0, rx:true, ry:true, rz:true},
        { recid: 5, node: 5, x:0, y:0, z:0, rx:true, ry:true, rz:true},
        { recid: 6, node: 6, x:0, y:0, z:0, rx:true, ry:true, rz:true},
        { recid: 7, node: 7, x:0, y:0, z:0, rx:true, ry:true, rz:true}
    ],
    nodeLoads: [
        {recid:0, node:3, x:1.0, y:0.0, z:0.0, rx:0.0, ry:0.0, rz:0.0},
        {recid:1, node:6, x:1.0, y:0.0, z:0.0, rx:0.0, ry:0.0, rz:0.0}
    ]
});

/*
//test simple X
model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 1.0, y: 0.0, z: 0.0 }
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:false, y:true, z:true, rx:false, ry:false, rz:false}
    ],
    nodeLoads: [
        {recid:0, node:1, x:1.0, y:0.0, z:0.0, rx:0.0, ry:0.0, rz:0.0}
    ]
};

//invX
model.nodes[1].x = -1.0;

//test simple Y
model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 0.0, y: 1.0, z: 0.0 }
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:true, y:false, z:true, rx:false, ry:false, rz:false}
    ],
    nodeLoads: [
        {recid:0, node:1, x:0.0, y:1.0, z:0.0, rx:0.0, ry:0.0, rz:0.0}
    ]
};

//invY
model.nodes[1].y = -1.0;

//test simple Z
model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 0.0, y: 0.0, z: 1.0 }
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:true, y:true, z:false, rx:false, ry:false, rz:false}
    ],
    nodeLoads: [
        {recid:0, node:1, x:0.0, y:0.0, z:1.0, rx:0.0, ry:0.0, rz:0.0}
    ]
};

//invZ
model.nodes[1].z = -1.0;

//test simple (0.7071,0.7071,0)
model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 0.7071, y: 0.7071, z: 0.0 },
        {recid:2, x:1.4142, y:0.0, z:0.0}
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0},
        {recid:1, n1:1,n2:2, EA:1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:false, y:false, z:true, rx:false, ry:false, rz:false},
        {recid:2, node:2, x:true, y:true, z:true}
    ],
    nodeLoads: [
        {recid:0, node:1, x:0.7071, y:0.7071, z:0.0, rx:0.0, ry:0.0, rz:0.0}
    ]
};

//inverse
model.nodes[1].y = -0.7071;
model.nodeLoads[0].y = -0.7071;

//test simple (0.7071,0.0,0.7071)
model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 0.7071, y: 0.0, z: 0.7071 },
        {recid:2, x:1.4142, y:0.0, z:0.0}
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0},
        {recid:1, n1:1,n2:2, EA:1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:false, y:true, z:false, rx:false, ry:false, rz:false},
        {recid:2, node:2, x:true, y:true, z:true}
    ],
    nodeLoads: [
        {recid:0, node:1, x:0.7071, y:0.0, z:0.7071, rx:0.0, ry:0.0, rz:0.0}
    ]
};

//inverse
model.nodes[1].z = -0.7071;
model.nodeLoads[0].z = -0.7071;

//test simple (0.0, 0.7071, 0.7071)
model = {
    nodes: [
        { recid: 0, x: 0.0, y: 0.0, z: 0.0 },
        { recid: 1, x: 0.0, y: 0.7071, z: 0.7071 },
        {recid:2, x:0.0, y:1.4142, z:0.0}
    ],
    lines: [
        { recid: 0, n1: 0, n2: 1, EA: 1.0},
        {recid:1, n1:1,n2:2, EA:1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:true, y:false, z:false, rx:false, ry:false, rz:false},
        {recid:2, node:2, x:true, y:true, z:true}
    ],
    nodeLoads: [
        {recid:0, node:1, x:0.0, y:0.7071, z:0.7071, rx:0.0, ry:0.0, rz:0.0}
    ]
};

//inverse
model.nodes[1].z = -0.7071;
model.nodeLoads[0].z = -0.7071;

*/