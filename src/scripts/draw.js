/*eslint-env browser, node*/

var THREE = require('three');

var scene;
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth*0.5/window.innerHeight, 1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*0.5, window.innerHeight );
document.body.appendChild( renderer.domElement );

function update(){
    var rx, ry;
    if (scene) {
        rx = scene.rotation.x;
        ry = scene.rotation.y;
    }
    scene = new THREE.Scene();
    model.nodes.forEach(function(rec){
        var geometry = new THREE.SphereGeometry( 50/500 );
        geometry.translate(rec.x,rec.y,rec.z);
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var sphere = new THREE.Mesh( geometry, material );
        scene.add( sphere );
    });
    model.lines.forEach(function(rec){
        var geometry = new THREE.Geometry();
        var n1 = model.nodes.find(function(t){
            return rec.n1 === t.recid;
        });
        var n2 = model.nodes.find(function(t){
            return rec.n2 === t.recid;
        });
        geometry.vertices.push(new THREE.Vector3(n1.x, n1.y, n1.z));
        geometry.vertices.push(new THREE.Vector3(n2.x, n2.y, n2.z));
        var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
        var line = new THREE.Line(geometry, material );
        scene.add(line);
    });
    
    if (rx){
        scene.rotation.x = rx;
    }
    if (ry){
        scene.rotation.y = ry;
    }
}
update();

camera.position.z = 15;
camera.position.y = 1.5;
camera.position.x = 1.5;

//Resize canvas when window resized.
window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth*0.5, window.innerHeight);
    camera.aspect = window.innerWidth*0.5 / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
}, false);

//Enable rotate by mouse drag.
var mousedown = false;
var prevPosition;
renderer.domElement.addEventListener('mousedown', function(e){
  mousedown = true;
  prevPosition = {x: e.pageX, y: e.pageY};
}, false);

renderer.domElement.addEventListener('mousemove', function(e){
  if(!mousedown) return;
  var moveDistance = {x: prevPosition.x - e.pageX, y: prevPosition.y - e.pageY};
  scene.rotation.x -= moveDistance.y * 0.02;
  scene.rotation.y -= moveDistance.x * 0.02;
  prevPosition = {x: e.pageX, y: e.pageY};
  render();
}, false);

renderer.domElement.addEventListener('mouseup', /* @callback */ function(e){
  mousedown = false;
}, false);


function render() {
	renderer.render(scene, camera);
}
render();