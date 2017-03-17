/*eslint-env node */

module.exports = [{
    category: "Graphical Input",
    menuList: [{
        label: "Wireframe",
        icon: "3d_rotation"
    }]
}, {
    category: "Input Tables",
    menuList: [{
        id: "nodes",
        label: "Nodes",
        icon: "input",
        columns: [{
            field: "recid",
            caption: "ID",
            size: "10%",
            editable: {
                type: "int"
            }
        }, {
            field: "x",
            caption: "X",
            size: "30%",
            editable: {
                type: "float"
            }
        }, {
            field: "y",
            caption: "Y",
            size: "30%",
            editable: {
                type: "float"
            }
        }, {
            field: "z",
            caption: "Z",
            size: "30%",
            editable: {
                type: "float"
            }
        }]
    }, {
        id: "lines",
        label: "Lines",
        icon: "input",
        columns: [{
            field: "recid",
            caption: "ID",
            size: "10%",
            editable: {
                type: "int"
            }
        }, {
            field: "n1",
            caption: "Node1",
            size: "22.5%",
            editable: {
                type: "int"
            }
        }, {
            field: "n2",
            caption: "Node2",
            size: "22.5%",
            editable: {
                type: "int"
            }
        }, {
            field: "section",
            caption: "Section",
            size: "22.5%",
            editable: {
                type: "int"
            }
        }, {
            field: "material",
            caption: "Material",
            size: "22.5%",
            editable: {
                type: "int"
            }
        }]
    }, {
        id: "sections",
        label: "Sections",
        icon: "input",
        columns: [{
            field: "recid",
            caption: "ID",
            size: "10%",
            editable: {
                type: "int"
            }
        }, {
            field: "shape",
            caption: "Shape",
            size: "10%",
            editable: {
                type: "text"
            }
        }, {
            field: "H",
            caption: "H",
            size: "18%",
            editable: {
                type: "float"
            }
        }, {
            field: "B",
            caption: "B",
            size: "18%",
            editable: {
                type: "float"
            }
        }, {
            field: "tw",
            caption: "tw",
            size: "18%",
            editable: {
                type: "float"
            }
        }, {
            field: "tf",
            caption: "tf",
            size: "18%",
            editable: {
                type: "float"
            }
        }, {
            field: "r",
            caption: "r",
            size: "18%",
            editable: {
                type: "float"
            }
        }]
    }, {
        id: "materials",
        label: "Materials",
        icon: "input",
        columns: [{
            field: "recid",
            caption: "ID",
            size: "10%",
            editable: {
                type: "int"
            }
        }, {
            field: "E",
            caption: "E",
            size: "45%",
            editable: {
                type: "float"
            }
        }, {
            field: "G",
            caption: "G",
            size: "45%",
            editable: {
                type: "float"
            }
        }]
    }, {
        id: "boundaries",
        label: "Boundaries",
        icon: "input",
        columns: [{
            field: "recid",
            caption: "ID",
            size: "9%",
            editable: {
                type: "int"
            }
        }, {
            field: "node",
            caption: "Node",
            size: "13%",
            editable: {
                type: "int"
            }
        }, {
            field: "x",
            caption: "dx",
            size: "13%",
            editable: {
                type: "check"
            }
        }, {
            field: "y",
            caption: "dy",
            size: "13%",
            editable: {
                type: "check"
            }
        }, {
            field: "z",
            caption: "dz",
            size: "13%",
            editable: {
                type: "check"
            }
        }, {
            field: "rx",
            caption: "rx",
            size: "13%",
            editable: {
                type: "check"
            }
        }, {
            field: "ry",
            caption: "ry",
            size: "13%",
            editable: {
                type: "check"
            }
        }, {
            field: "rz",
            caption: "rz",
            size: "13%",
            editable: {
                type: "check"
            }
        }]
    }, {
        id: "nodeLoads",
        label: "Node Loads",
        icon: "input",
        columns: [{
            field: "recid",
            caption: "ID",
            size: "10%",
            editable: {
                type: "int"
            }
        }, {
            field: "x",
            caption: "Px",
            size: "15%",
            editable: {
                type: "float"
            }
        }, {
            field: "y",
            caption: "Py",
            size: "15%",
            editable: {
                type: "float"
            }
        }, {
            field: "z",
            caption: "Pz",
            size: "15%",
            editable: {
                type: "float"
            }
        }, {
            field: "rx",
            caption: "Mx",
            size: "15%",
            editable: {
                type: "float"
            }
        }, {
            field: "ry",
            caption: "My",
            size: "15%",
            editable: {
                type: "float"
            }
        }, {
            field: "rz",
            caption: "Mz",
            size: "15%",
            editable: {
                type: "float"
            }
        }]
    }]
}, {
    category: "Graphical Results",
    menuList: [{
        label: "Displacements",
        icon: "3d_rotation"
    }]
}, {
    category: "Result Tables",
    menuList: [{
        label: "Displacements",
        icon: "receipt"
    }]
}];