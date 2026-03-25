'use client';

import { useEffect, useRef } from 'react';
import emitter, { events } from '../utils/EventEmitter';

export default function VideoTextures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMuteToggle = (muted: boolean) => {
      if (video1Ref.current) video1Ref.current.muted = muted;
      if (video2Ref.current) video2Ref.current.muted = muted;
    };

    emitter.on(events.muteToggle, handleMuteToggle);

    return () => {
      emitter.off(events.muteToggle, handleMuteToggle);
    };
  }, []);

  return (
    <div id="monitor-videos" ref={containerRef}>
      <video
        ref={video1Ref}
        id="monitor-video-1"
        src="/videos/video-1.mp4"
        muted
        loop
        autoPlay
        playsInline
        crossOrigin="anonymous"
      />
      <video
        ref={video2Ref}
        id="monitor-video-2"
        src="/videos/video-2.mp4"
        muted
        loop
        autoPlay
        playsInline
        crossOrigin="anonymous"
      />
    </div>
  );
}
