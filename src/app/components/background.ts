import * as THREE from 'three';

export class Background extends THREE.Group {
  color: number = 0x734a34;
  texturePath: string = "/assets/9-spring-sky-panorama-at-dinosaur-park.jpg";

  loader = new THREE.TextureLoader();
  
  geometry = (new THREE.CylinderGeometry(700, 700, 400, 10)).scale(-1, 1, 1);

  texture = new THREE.TextureLoader().load(this.texturePath, (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(3, 1);
    });
  material = new THREE.MeshBasicMaterial({ map: this.texture });

  sphere = new THREE.Mesh(this.geometry, this.material);
  
  constructor() {
    super();

    this.rotateX(Math.PI/2);
    this.translateY(160);
    this.add(this.sphere);
  }
}
