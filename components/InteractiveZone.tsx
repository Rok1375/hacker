'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emitter, { events } from '../utils/EventEmitter';

export default function InteractiveZone() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInMonitor, setIsInMonitor] = useState(false);

  useEffect(() => {
    const handleLoadingDone = () => {
      setTimeout(() => setIsVisible(true), 1000);
    };

    const handleEnterMonitor = () => {
      setIsInMonitor(true);
    };

    const handleLeftMonitor = () => {
      setIsInMonitor(false);
    };

    emitter.on(events.loadingScreenDone, handleLoadingDone);
    emitter.on(events.enterMonitor, handleEnterMonitor);
    emitter.on(events.leftMonitor, handleLeftMonitor);

    return () => {
      emitter.off(events.loadingScreenDone, handleLoadingDone);
      emitter.off(events.enterMonitor, handleEnterMonitor);
      emitter.off(events.leftMonitor, handleLeftMonitor);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'prevent-click') return;
      if (isInMonitor) return;

      emitter.emit(events.enterMonitor);
    },
    [isInMonitor]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInMonitor) {
        emitter.emit(events.leftMonitor);
      }
    },
    [isInMonitor]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isVisible && !isInMonitor && (
        <motion.div
          id="ui-interactive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClick}
          className="fixed inset-0 z-30 cursor-pointer"
          style={{ background: 'transparent' }}
        >
          {/* Click prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.3, 0.8, 0.3], y: 0 }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 0.5, ease: 'easeOut' },
            }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <p className="text-white font-mono text-sm opacity-60 tracking-widest uppercase">
              Click anywhere to interact
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
