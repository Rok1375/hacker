'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emitter, { events } from '../utils/EventEmitter';

export default function Overlay() {
  const [isInMonitor, setIsInMonitor] = useState(false);

  useEffect(() => {
    const handleEnter = () => setIsInMonitor(true);
    const handleLeave = () => setIsInMonitor(false);

    emitter.on(events.enterMonitor, handleEnter);
    emitter.on(events.leftMonitor, handleLeave);

    return () => {
      emitter.off(events.enterMonitor, handleEnter);
      emitter.off(events.leftMonitor, handleLeave);
    };
  }, []);

  const handleBack = () => {
    emitter.emit(events.leftMonitor);
  };

  return (
    <AnimatePresence>
      {isInMonitor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-40 pointer-events-none"
        >
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
            onClick={handleBack}
            className="absolute top-8 left-8 pointer-events-auto z-50 flex items-center gap-2 bg-black px-4 py-2 cursor-pointer group"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-[-2px] transition-transform"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-white font-mono text-sm group-hover:opacity-80 transition-opacity">
              BACK
            </span>
          </motion.button>

          {/* Crosshair indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1"
              >
                <circle cx="12" cy="12" r="8" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
              </svg>
            </motion.div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
