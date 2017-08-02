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
        "x": 3.0,
        "y": 3.0,
        "z": 0.0
    }, {
        "x": 0.0,
        "y": 0.0,
        "z": 3.0
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
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 4],
        [1, 5],
        [1, 7],
        [2, 4],
        [2, 6],
        [2, 7],
        [3, 5],
        [3, 6],
        [3, 7],
        [4, 5],
        [4, 6],
        [4, 7],
        [5, 7],
        [5, 6],
        [6, 7]
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
    [4, 6].forEach((i) => {
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
        nodes,
        lines,
        boundaries,
        materials,
        nodeloads,
        sections
    });
};
