import * as THREE from 'three';
import Resources from '../utils/Resources';
import Computer from './Computer';
import Environment from './Environment';

export default class World {
  scene: THREE.Scene;
  resources: Resources;
  computer: Computer | null;
  environment: Environment | null;

  constructor(scene: THREE.Scene, resources: Resources) {
    this.scene = scene;
    this.resources = resources;
    this.computer = null;
    this.environment = null;

    this.resources.on('ready', () => {
      this.computer = new Computer(this.scene, this.resources);
      this.environment = new Environment(this.scene);
    });
  }

  update() {
    if (this.computer) {
      this.computer.update();
    }
    if (this.environment) {
      this.environment.update();
    }
  }

  destroy() {
    if (this.computer) {
      this.computer.destroy();
    }
    if (this.environment) {
      this.environment.destroy();
    }
  }
}
