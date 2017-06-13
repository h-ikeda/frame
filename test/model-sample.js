export default {
    "boundaries" : {
        "a": {
            "node" : "a",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : true,
            "y" : true,
            "z" : true
        },
        "b": {
            "node" : "b",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : true,
            "y" : true,
            "z" : true
        },
        "c": {
            "node" : "c",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : true,
            "y" : true,
            "z" : true
        },
        "d": {
            "node" : "d",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : true,
            "y" : true,
            "z" : true
        },
        "e": {
            "node" : "e",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : 0,
            "y" : 0,
            "z" : 0
        },
        "f": {
            "node" : "f",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : 0,
            "y" : 0,
            "z" : 0
        },
        "g": {
            "node" : "g",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : 0,
            "y" : 0,
            "z" : 0
        },
        "h": {
            "node" : "h",
            "rx" : true,
            "ry" : true,
            "rz" : true,
            "x" : 0,
            "y" : 0,
            "z" : 0
        }
    },
    "lines": {
        "a": {
            "material" : "a",
            "n1" : "a",
            "n2" : "d",
            "section" : "a"
        },
        "b": {
            "material" : "a",
            "n1" : "b",
            "n2" : "f",
            "section" : "a"
        },
        "c": {
            "material" : "a",
            "n1" : "c",
            "n2" : "g",
            "section" : "a"
        },
        "d": {
            "material" : "a",
            "n1" : "d",
            "n2" : "f",
            "section" : "a"
        },
        "e": {
            "material" : "a",
            "n1" : "d",
            "n2" : "g",
            "section" : "a"
        },
        "f": {
            "material" : "a",
            "n1" : "e",
            "n2" : "h",
            "section" : "a"
        },
        "g": {
            "material" : "a",
            "n1" : "f",
            "n2" : "h",
            "section" : "a"
        },
        "h": {
            "material" : "a",
            "n1" : "g",
            "n2" : "h",
            "section" : "a"
        },
        "i": {
            "material" : "a",
            "n1" : "a",
            "n2" : "f",
            "section" : "a"
        },
        "j": {
            "material" : "a",
            "n1" : "e",
            "n2" : "f",
            "section" : "a"
        },
        "k": {
            "material" : "a",
            "n1" : "a",
            "n2" : "g",
            "section" : "a"
        },
        "m": {
            "material" : "a",
            "n1" : "e",
            "n2" : "g",
            "section" : "a"
        },
        "n": {
            "material" : "a",
            "n1" : "f",
            "n2" : "g",
            "section" : "a"
        },
        "q": {
            "material" : "a",
            "n1" : "d",
            "n2" : "b",
            "section" : "a"
        },
        "r": {
            "material" : "a",
            "n1" : "c",
            "n2" : "h",
            "section" : "a"
        },
        "s": {
            "material" : "a",
            "n1" : "c",
            "n2" : "d",
            "section" : "a"
        },
        "t": {
            "material" : "a",
            "n1" : "b",
            "n2" : "h",
            "section" : "a"
        },
        "u": {
            "material" : "a",
            "n1" : "d",
            "n2" : "h",
            "section" : "a"
        }
    },
    "materials" : {
        "a": {
            "E" : 1,
            "G" : 1
        }
    },
    "nodeloads" : {
        "a": {
            "node" : "d",
            "rx" : 0.0,
            "ry" : 0.0,
            "rz" : 0.0,
            "x" : 1.0,
            "y" : 0.0,
            "z" : 0.0
        },
        "b": {
            "node" : "g",
            "rx" : 0.0,
            "ry" : 0.0,
            "rz" : 0.0,
            "x" : 1.0,
            "y" : 0.0,
            "z" : 0.0
        }
    },
    "nodes" : {
        "a": {
            "x" : 0,
            "y" : 0.0,
            "z" : 0.0
        },
        "b": {
            "x" : 3.0,
            "y" : 0.0,
            "z" : 0.0
        },
        "c": {
            "x" : 0.0,
            "y" : 3.0,
            "z" : 0.0
        },
        "d": {
            "x" : 0.0,
            "y" : 0.0,
            "z" : 3.0
        },
        "e": {
            "x" : 3.0,
            "y" : 3.0,
            "z" : 0.0
        },
        "f": {
            "x" : 3.0,
            "y" : 0.0,
            "z" : 3.0
        },
        "g": {
            "x" : 0.0,
            "y" : 3.0,
            "z" : 3.0
        },
        "h": {
            "x" : 3.0,
            "y" : 3.0,
            "z" : 3.0
        }
    },
    "sections" : {
        "a": {
            "B" : 3.125,
            "H" : 3.2,
            "shape" : "H",
            "tf" : 0.1,
            "tw" : 0.125
        }
    }
};
