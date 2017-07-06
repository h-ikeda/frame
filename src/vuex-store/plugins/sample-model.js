import uuid from "uuid/v4";

export default function(store) {
    const nodeArray = [{
        "x": 0.0,
        "y": 0.0,
        "z": 0.0
    }, {
        "x": 3.0,
        "y": 0.0,
        "z": 0.0
    }, {
        "x": 0.0,
        "y": 3.0,
        "z": 0.0
    }, {
        "x": 0.0,
        "y": 0.0,
        "z": 3.0
    }, {
        "x": 3.0,
        "y": 3.0,
        "z": 0.0
    }, {
        "x": 3.0,
        "y": 0.0,
        "z": 3.0
    }, {
        "x": 0.0,
        "y": 3.0,
        "z": 3.0
    }, {
        "x": 3.0,
        "y": 3.0,
        "z": 3.0
    }];
    const nodes = {};
    const nodeIds = [];
    nodeArray.forEach((node) => {
        const id = uuid();
        nodeIds.push(id);
        nodes[id] = node;
    });

    const material = uuid();
    const section = uuid();
    const combination = [
        [0, 3],
        [1, 5],
        [2, 6],
        [3, 5],
        [3, 6],
        [4, 7],
        [5, 7],
        [6, 7],
        [0, 5],
        [4, 5],
        [0, 6],
        [4, 6],
        [5, 6],
        [3, 1],
        [2, 7],
        [2, 3],
        [1, 7],
        [3, 7]
    ];
    const lines = {};
    combination.forEach((ids) => {
        lines[uuid()] = {
            n1: nodeIds[ids[0]],
            n2: nodeIds[ids[1]],
            material,
            section
        };
    });

    const materials = {
        [material]: {
            E: 1,
            G: 1
        }
    };

    const sections = {
        [section]: {
            shape: "H",
            B: 3.125,
            H: 3.2,
            tf: 0.1,
            tw: 0.125
        }
    };

    const boundaries = {};
    for (let i = 0; i < 4; ++i) {
        boundaries[uuid()] = {
            node: nodeIds[i],
            x: true,
            y: true,
            z: true,
            rx: true,
            ry: true,
            rz: true
        };
    }
    for (let i = 4; i < 8; ++i) {
        boundaries[uuid()] = {
            node: nodeIds[i],
            x: 0,
            y: 0,
            z: 0,
            rx: true,
            ry: true,
            rz: true
        };
    }

    const nodeloads = {};
    [3, 6].forEach((i) => {
        nodeloads[uuid()] = {
            node: nodeIds[i],
            x: 1.0,
            y: 0.0,
            z: 0.0,
            rx: 0.0,
            ry: 0.0,
            rz: 0.0
        };
    });
    
    store.dispatch("model/input/setData", {
        data: {
            nodes,
            lines,
            boundaries,
            materials,
            nodeloads,
            sections
        },
        order: {
            nodes: Object.keys(nodes),
            lines: Object.keys(lines),
            boundaries: Object.keys(boundaries),
            materials: Object.keys(materials),
            nodeloads: Object.keys(nodeloads),
            sections: Object.keys(sections)
        }
    });
}
