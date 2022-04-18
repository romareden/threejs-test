import * as THREE from 'three';

export class Ground extends THREE.Group {
  color: number = 0x734a34;
  texturePath: string = "/assets/dry+grass+ground-2048x2048.jpg";

  loader = new THREE.TextureLoader();
  
  geometry = new THREE.PlaneGeometry(1, 1);
  material = new THREE.MeshPhongMaterial( {map: this.loader.load(this.texturePath, (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 20, 20 );
  })} );
  plane = new THREE.Mesh(this.geometry, this.material);
  
  constructor(x: number, y: number) {
    super();

    this.scale.x = x;
    this.scale.y = y;
    
    this.plane.receiveShadow = true;
    this.add(this.plane);
  }

}
