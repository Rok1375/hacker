import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Sizes from '../utils/Sizes';

export default class Camera {
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLElement;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;
  mouse: { x: number; y: number };
  targetPosition: THREE.Vector3;
  private handleMouseMove: (event: MouseEvent) => void;

  constructor(sizes: Sizes, scene: THREE.Scene, canvas: HTMLElement) {
    this.sizes = sizes;
    this.scene = scene;
    this.canvas = canvas;
    this.mouse = { x: 0, y: 0 };
    this.targetPosition = new THREE.Vector3(0, 0, 0);

    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.controls = null!;

    this.handleMouseMove = (event: MouseEvent) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    this.setInstance();
    this.setControls();
    this.setMouseMove();
  }

  setInstance() {
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.minPolarAngle = Math.PI / 4;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minAzimuthAngle = -Math.PI / 4;
    this.controls.maxAzimuthAngle = Math.PI / 4;
  }

  setMouseMove() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();

    const targetX = this.mouse.x * 0.5;
    const targetY = this.mouse.y * 0.5;

    this.instance.position.x += (6 + targetX - this.instance.position.x) * 0.02;
    this.instance.position.y += (4 + targetY - this.instance.position.y) * 0.02;

    this.instance.lookAt(0, 0, 0);
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.controls.dispose();
  }
}
