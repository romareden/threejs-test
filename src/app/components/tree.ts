import * as THREE from 'three';

export class Tree extends THREE.Group {
  color: number = 0x734a34;

  trunkGeometry = new THREE.CylinderGeometry(2, 2, 10, 4);
  
  trunkMaterial = new THREE.MeshPhongMaterial( { color: this.color } );

  trunk = new THREE.Mesh( this.trunkGeometry, this.trunkMaterial );
  branch1 = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 13, 10, 4),
    new THREE.MeshPhongMaterial({color: 0x058202})
  );
  branch2 = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 10, 12, 4),
    new THREE.MeshPhongMaterial({color: 0x058202})
  );
  branch3 = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 6, 10, 4),
    new THREE.MeshPhongMaterial({color: 0x058202})
  );
  
  constructor(x: number, y: number) {
    super();

    this.position.x = x;
    this.position.y = y;
    
    this.trunk.rotateX(Math.PI/2);
    this.trunk.castShadow = true;
    this.add(this.trunk);
    
    this.branch1.position.z = 10;
    this.branch1.rotateX(Math.PI/2);
    this.branch1.castShadow = true;
    this.add(this.branch1);
    
    this.branch2.position.z = 20;
    this.branch2.rotateX(Math.PI/2);
    this.branch2.castShadow = true;
    this.add(this.branch2);

    this.branch3.position.z = 30;
    this.branch3.rotateX(Math.PI/2);
    this.branch3.castShadow = true;
    this.add(this.branch3);
  }
}
