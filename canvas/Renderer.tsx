import * as THREE from 'three';
import Sizes from '../utils/Sizes';
import Camera from './Camera';

export default class Renderer {
  canvas: HTMLElement;
  sizes: Sizes;
  scene: THREE.Scene;
  camera: Camera;
  instance: THREE.WebGLRenderer;

  constructor(
    canvas: HTMLElement,
    sizes: Sizes,
    scene: THREE.Scene,
    camera: Camera
  ) {
    this.canvas = canvas;
    this.sizes = sizes;
    this.scene = scene;
    this.camera = camera;

    this.instance = null!;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    });

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setClearColor(0x000000, 1);

    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.2;

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }

  destroy() {
    this.instance.dispose();
  }
}
