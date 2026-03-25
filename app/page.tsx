'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '../components/LoadingScreen';
import InfoPanel from '../components/InfoPanel';
import Overlay from '../components/Overlay';
import VideoTextures from '../components/VideoTextures';
import InteractiveZone from '../components/InteractiveZone';

const Experience = dynamic(() => import('../canvas/Experience'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <Experience />
      <Overlay />
      <VideoTextures />
      <InteractiveZone />
      <InfoPanel />
      <LoadingScreen />
      <div id="css" className="absolute inset-0 pointer-events-none" />
    </main>
  );
}
