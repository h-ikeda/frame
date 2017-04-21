import * as THREE from "three";

export default class {
    constructor(nodes) {
        this._ = new THREE.Group();
        const material = new THREE.PointsMaterial({color: 0xff0000});
        Object.keys(nodes).forEach(key => {
            if (nodes[key]) {
                const node = nodes[key];
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(node.x, node.y, node.z));
                var points = new THREE.Points(geometry, material);
                this._.add(points);
            }
        });
    }
    get group() {
        return this._;
    }
}
