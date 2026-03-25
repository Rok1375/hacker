import EventEmitter from 'eventemitter3';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Texture, TextureLoader } from 'three';

interface Source {
  name: string;
  type: 'gltfModel' | 'texture' | 'video';
  path: string;
}

export default class Resources extends EventEmitter {
  sources: Source[];
  items: Record<string, GLTF | Texture | HTMLVideoElement>;
  toLoad: number;
  loaded: number;
  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
  };

  constructor(sources: Source[]) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
    };

    this.startLoading();
  }

  startLoading() {
    if (this.sources.length === 0) {
      this.emit('ready');
      return;
    }

    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(
          source.path,
          (file: GLTF) => {
            this.sourceLoaded(source, file);
          },
          undefined,
          (error: unknown) => {
            console.warn(`Failed to load model: ${source.path}`, error);
            this.sourceLoaded(source, null);
          }
        );
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(
          source.path,
          (file: Texture) => {
            this.sourceLoaded(source, file);
          },
          undefined,
          (error: unknown) => {
            console.warn(`Failed to load texture: ${source.path}`, error);
            this.sourceLoaded(source, null);
          }
        );
      } else if (source.type === 'video') {
        const video = document.createElement('video');
        video.src = source.path;
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.play().catch(() => {
          // Autoplay may be blocked, that's okay
        });
        this.sourceLoaded(source, video);
      }
    }
  }

  sourceLoaded(source: Source, file: GLTF | Texture | HTMLVideoElement | null) {
    if (file) {
      this.items[source.name] = file;
    }
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.emit('ready');
    }
  }
}
