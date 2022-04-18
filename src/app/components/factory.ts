import * as THREE from 'three';

export class Factory extends THREE.Group {
  
  constructor(
    object: THREE.Group,
    amount: number,
    minDistance: number,
    maxDistance: number,
    variation: number = 0
  ) {
    super();

    let inRow = Math.round(Math.sqrt(amount));

    for (let i = 0; i < inRow; i++) {
      for (let j = 0; j < inRow; j++) {
        object = object.clone();
        
        object.position.x = i * this.random(minDistance, maxDistance);
        object.position.y = j * this.random(minDistance, maxDistance);
        
        if (variation) {
          let scale = this.random(1 - variation, 1);
          object.scale.set(scale, scale, scale);
        }

        this.add(object);
      }
    }
  }
  
  private random(min: number, max: number): number {
    return (max - min) * Math.random() + min;
  }
}
