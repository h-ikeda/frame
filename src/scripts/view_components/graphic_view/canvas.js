/*eslint-env node*/

var m = require("mithril");
var THREE = require("three");

module.exports = {
    rX: 0,
    rZ: 0,
    mD: false
};

var scene;

function setRef(ref) {
    scene = new THREE.Scene();
            ref.on("value", function(res) {
                while (scene.children.length > 0) {
                    scene.remove(scene.children[0]);
                }
                var model = res.val();
                var material = new THREE.LineBasicMaterial();
                Object.values(model.lines).forEach(function(line) {
                    var n1 = model.nodes[line.n1];
                    var n2 = model.nodes[line.n2];
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(n1.x, n1.y, n1.z));
                    geometry.vertices.push(new THREE.Vector3(n2.x, n2.y, n2.z));
                    var lineObject = new THREE.Line(geometry, material);
                    scene.add(lineObject);
                });
                material = new THREE.PointsMaterial({color: 0xff0000});
                Object.values(model.nodes).forEach(function(node) {
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(node.x, node.y, node.z));
                    var points = new THREE.Points(geometry, material);
                    scene.add(points);
                });
            });
}

module.exports.view = function(args) {
    return m(".canvas-wapper", {
        onupdate: function(vnode) {
            setRef(args.attrs.ref);
        },
        oncreate: function(vnode) {
            var w = vnode.dom.clientWidth;
            var h = vnode.dom.clientHeight;

            setRef(args.attrs.ref);
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( w, h );
            vnode.dom.appendChild( renderer.domElement );

            var camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );
            camera.position.y = -10;
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            function render() {
                requestAnimationFrame( render );
                scene.rotation.x = args.state.rX;
                scene.rotation.z = args.state.rZ;
                renderer.render( scene, camera );
            }
            render();
        },
        onmousemove: function(e) {
            if (args.state.mD) {
                args.state.rZ += e.movementX * 0.01;
                args.state.rX += e.movementY * 0.01;
            }
        },
        onmousedown: function(e) {
            args.state.mD = true;
        },
        onmouseup: function(e) {
            args.state.mD = false;
        }
    });
};
