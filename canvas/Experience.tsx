'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Sizes from '../utils/Sizes';
import Time from '../utils/Time';
import Resources from '../utils/Resources';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World';
import sources from '../utils/sources';
import emitter, { events } from '../utils/EventEmitter';

interface ExperienceInstance {
  sizes: Sizes;
  time: Time;
  resources: Resources;
  camera: Camera;
  renderer: Renderer;
  world: World;
  scene: THREE.Scene;
}

export default function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<ExperienceInstance | null>(null);

  useEffect(() => {
    if (!canvasRef.current || experienceRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const sizes = new Sizes();
    const time = new Time();
    const resources = new Resources(sources);

    const camera = new Camera(sizes, scene, canvasRef.current);
    const renderer = new Renderer(canvasRef.current, sizes, scene, camera);
    const world = new World(scene, resources);

    experienceRef.current = {
      sizes,
      time,
      resources,
      camera,
      renderer,
      world,
      scene,
    };

    sizes.on('resize', () => {
      camera.resize();
      renderer.resize();
    });

    time.on('tick', () => {
      camera.update();
      world.update();
      renderer.update();
    });

    resources.on('ready', () => {
      emitter.emit(events.loadingScreenDone);
    });

    return () => {
      time.destroy();
      sizes.destroy();
      camera.destroy();
      renderer.destroy();
      world.destroy();
      scene.clear();
      experienceRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="webgl"
      className="webgl"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        outline: 'none',
      }}
    />
  );
}
