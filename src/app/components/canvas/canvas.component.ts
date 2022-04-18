import { AfterViewInit, Component, ElementRef, ViewChild, HostListener } from '@angular/core';

import * as THREE from 'three';
import { Tree } from '../tree';
import { Ground } from '../ground';
import { Background } from '../background';
import { Factory } from '../factory';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  cameraIsMoving: boolean = false;
  cameraMovingA: number = 0;
  cameraDirection: string = '';

  @ViewChild('canvas')
  canvasRef!: ElementRef;

  cameraZ: number = 20;
  fieldOfView: number = 50;
  nearClippingPlane: number = 1;
  farClippingPlane: number = 3000;

  savingInterval = 15000;

  light = new THREE.HemisphereLight( 0xB1E1FF, 0xFFFFFF, 0.1 );
  pointLight = new THREE.PointLight( 0xFFFFFF, 1, 1000 );

  camera!: THREE.PerspectiveCamera;
  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.cameraIsMoving = true;
    this.cameraDirection = event.key;
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUpEvent() {
    this.cameraIsMoving = false;
  }

  cameraAction(state: boolean, direction: string) {
    if (!state) return; 
    
    switch (direction) {
      case "ArrowLeft":
        this.camera.rotateY(0.05);
          break;
      case "ArrowRight":
        this.camera.rotateY(-0.05);
          break;
      case "ArrowUp":
        this.camera.translateZ(-2);
          break;
      case "ArrowDown":
        this.camera.translateZ(2);
          break;
    }
  }

  constructor(private data: DataService, private user: UserService) { }

  ngAfterViewInit() {
    this.createScene();
    this.createCamera();

    this.data.loadPosition(this.user.getName())
      .subscribe((userPosition) => {
        const {x, y, z} = userPosition.position;

        this.positionCamera(x, y, z);
      })
    
    this.startRenderingLoop();

    setInterval(()=>this.data.savePosition({ user: this.user.getName(), position: this.camera.position }), this.savingInterval)
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  createCamera() {
    const aspectRatio = this.getAspectRatio();

    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
  }

  positionCamera(x: number = 0, y: number = 0, z: number = this.cameraZ) {
    this.camera.rotateX(Math.PI/2);

    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
  }

  createScene() {
    this.scene = new THREE.Scene();

    this.scene.add(this.light);
    
    this.pointLight.position.set(250, 250, 300);
    this.pointLight.castShadow = true;

    this.scene.add(this.pointLight);
    
    this.scene.add(new Ground(1000, 1000));
    this.scene.add(new Background());

    this.scene.fog = new THREE.Fog(0xffffff, 10, 700);

    let trees = new Factory(new Tree(1, 1), 120, 80, 120, 0.8);
    trees.position.x = -500;
    trees.position.y = -500;
    this.scene.add(trees);
  }

  startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CanvasComponent = this;

    (function render() {
      requestAnimationFrame(render);

      component.cameraAction(component.cameraIsMoving, component.cameraDirection);
      component.renderer.render(component.scene, component.camera);
    }());
  }
}
