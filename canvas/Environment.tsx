import * as THREE from 'three';

export default class Environment {
  scene: THREE.Scene;
  sunLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
  monitorGlow: THREE.PointLight;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    this.sunLight = null!;
    this.ambientLight = null!;
    this.monitorGlow = null!;

    this.setSunLight();
    this.setAmbientLight();
    this.setMonitorGlow();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2);
    this.sunLight.position.set(5, 8, 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.bias = -0.001;
    this.scene.add(this.sunLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.3);
    this.scene.add(this.ambientLight);
  }

  setMonitorGlow() {
    this.monitorGlow = new THREE.PointLight('#4444ff', 2, 10);
    this.monitorGlow.position.set(0, 1, 0);
    this.scene.add(this.monitorGlow);
  }

  update() {
    const time = Date.now() * 0.001;
    this.monitorGlow.intensity = 2 + Math.sin(time * 10) * 0.1;
  }

  destroy() {
    this.scene.remove(this.sunLight);
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.monitorGlow);
    this.sunLight.dispose();
    this.ambientLight.dispose();
    this.monitorGlow.dispose();
  }
}
