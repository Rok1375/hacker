'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';
import emitter, { events } from '../utils/EventEmitter';

const loadingSteps = [
  'BIOS Date 01/01/22 14:22:51 Ver 1.0.2',
  'CPU: Henry Heffernan Processor @ 3.9GHz',
  'Speed: 3900MHz',
  'DRAM Status: 16384MB OK',
  '',
  'Detecting SATA 1... None',
  'Detecting SATA 2... None',
  'Detecting SATA 3... SSD 512GB',
  '',
  'Initializing USB Controllers.. Done',
  'Detecting USB devices...',
  '  1 Keyboard, 1 Mouse, 1 Webcam',
  '',
  'Loading Operating System...',
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPressButton, setShowPressButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleDone = () => {
      setIsLoading(false);
    };

    emitter.on(events.loadingScreenDone, handleDone);
    return () => {
      emitter.off(events.loadingScreenDone, handleDone);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShowPressButton(true);
    }
  }, [isLoading]);

  const handleStart = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between"
        >
          <div className="loading-screen-header">
            <p className="text-white font-mono">Award Modular BIOS v1.0.2</p>
          </div>

          <div className="loading-screen-body flex-1 overflow-hidden">
            {loadingSteps.map((step, index) => (
              <div key={index} className="mb-1">
                {index <= currentStep && (
                  <TypewriterText
                    text={step}
                    delay={10}
                    onComplete={() => {
                      if (index === loadingSteps.length - 1 && isLoading) {
                        // Wait for resources to finish loading
                      } else if (index < loadingSteps.length - 1) {
                        setTimeout(() => setCurrentStep(index + 1), 100);
                      } else if (!isLoading) {
                        setShowPressButton(true);
                      }
                    }}
                    startDelay={index === 0 ? 0 : undefined}
                  />
                )}
              </div>
            ))}

            {isLoading && currentStep >= loadingSteps.length - 1 && (
              <div className="mt-4">
                <span className="loading text-white font-mono">Loading</span>
              </div>
            )}
          </div>

          <div className="loading-screen-footer">
            {showPressButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bios-start-button inline-block"
                onClick={handleStart}
              >
                <p className="text-white font-mono uppercase tracking-wider">
                  CLICK TO ENTER
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
