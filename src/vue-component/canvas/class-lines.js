import * as THREE from "three";

export default class {
    constructor(lines, nodes) {
        this._ = new THREE.Group();
        var material = new THREE.LineBasicMaterial();
        Object.keys(lines).forEach(key => {
            if (lines[key]) {
                const line = lines[key];
                const n1 = nodes[line.n1];
                const n2 = nodes[line.n2];
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(n1.x, n1.y, n1.z));
                geometry.vertices.push(new THREE.Vector3(n2.x, n2.y, n2.z));
                var lineObject = new THREE.Line(geometry, material);
                this._.add(lineObject);
            }
        });
    }
    get group() {
        return this._;
    }
}
