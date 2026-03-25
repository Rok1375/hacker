import * as THREE from 'three';
import Resources from '../utils/Resources';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Computer {
  scene: THREE.Scene;
  resources: Resources;
  model: GLTF | null;
  monitorMaterials: THREE.MeshBasicMaterial[];
  videoTextures: THREE.VideoTexture[];

  constructor(scene: THREE.Scene, resources: Resources) {
    this.scene = scene;
    this.resources = resources;
    this.model = null;
    this.monitorMaterials = [];
    this.videoTextures = [];

    this.setModel();
    this.setVideos();
  }

  setModel() {
    const item = this.resources.items.computerModel;
    if (!item || !(item as GLTF).scene) return;

    this.model = item as GLTF;

    this.model.scene.scale.set(1, 1, 1);
    this.model.scene.position.set(0, 0, 0);
    this.model.scene.rotation.set(0, 0, 0);

    this.model.scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const childName = child.name.toLowerCase();
        const materialName =
          child.material instanceof THREE.Material
            ? child.material.name.toLowerCase()
            : '';

        if (
          childName.includes('screen') ||
          childName.includes('monitor') ||
          materialName.includes('screen')
        ) {
          const videoMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
          });
          child.material = videoMaterial;
          this.monitorMaterials.push(videoMaterial);
        }
      }
    });

    this.scene.add(this.model.scene);
  }

  setVideos() {
    const video1 = this.resources.items.monitorTexture1 as
      | HTMLVideoElement
      | undefined;
    const video2 = this.resources.items.monitorTexture2 as
      | HTMLVideoElement
      | undefined;

    if (video1) {
      const texture1 = new THREE.VideoTexture(video1);
      texture1.minFilter = THREE.LinearFilter;
      texture1.magFilter = THREE.LinearFilter;
      texture1.colorSpace = THREE.SRGBColorSpace;
      this.videoTextures.push(texture1);
    }

    if (video2) {
      const texture2 = new THREE.VideoTexture(video2);
      texture2.minFilter = THREE.LinearFilter;
      texture2.magFilter = THREE.LinearFilter;
      texture2.colorSpace = THREE.SRGBColorSpace;
      this.videoTextures.push(texture2);
    }

    this.monitorMaterials.forEach((material, index) => {
      const texture = this.videoTextures[index % this.videoTextures.length];
      if (texture) {
        material.map = texture;
        material.needsUpdate = true;
      }
    });
  }

  update() {
    this.videoTextures.forEach((texture) => {
      if (
        texture.image &&
        (texture.image as HTMLVideoElement).readyState >= 2
      ) {
        texture.needsUpdate = true;
      }
    });
  }

  destroy() {
    this.videoTextures.forEach((texture) => texture.dispose());
    this.monitorMaterials.forEach((material) => material.dispose());
    if (this.model) {
      this.scene.remove(this.model.scene);
    }
  }
}
