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
        {recid:15,n1:0,n2:6,EA:1.0},
        {recid:16,n1:4,n2:6,EA:1.0},
        {recid:17,n1:5,n2:6,EA:1.0}
    ],
    boundaries: [
        { recid: 0, node: 0, x:true, y:true, z:true, rx: false, ry: false, rz: false},
        { recid: 1, node: 1, x:true, y:true, z:true, rx:false, ry:false, rz:false},
        { recid: 2, node:2, x:true, y:true, z:true, rx:false, ry:false, rz:false},
        {recid:3, node: 4, x:true, y:true, z:true, rx:false, ry:false, rz:false}
    ],
    nodeLoads: [
        {recid:0, node:3, x:10.0, y:0.0, z:0.0, rx:0.0, ry:0.0, rz:0.0}
    ]
};