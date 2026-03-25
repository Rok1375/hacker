'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import MuteButton from './MuteButton';
import InfoButton from './InfoButton';
import emitter, { events } from '../utils/EventEmitter';

const panelVariants = {
  hidden: {
    x: -32,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' },
  },
};

const rowContainerStyle: React.CSSProperties = {
  background: 'black',
  padding: '4px 16px',
  textAlign: 'center',
  display: 'flex',
  marginBottom: '4px',
  boxSizing: 'border-box',
};

const lastRowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
};

const lastRowChildStyle: React.CSSProperties = {
  marginRight: '4px',
};

export default function InfoPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);
  const [timeComplete, setTimeComplete] = useState(false);
  const [showMute, setShowMute] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isInteractive, setIsInteractive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleLoadingDone = () => {
      setTimeout(() => setIsVisible(true), 400);
    };

    const handleEnterMonitor = () => {
      setIsVisible(false);
      setIsInteractive(false);
    };

    const handleLeftMonitor = () => {
      setIsVisible(true);
      setIsInteractive(true);
    };

    emitter.on(events.loadingScreenDone, handleLoadingDone);
    emitter.on(events.enterMonitor, handleEnterMonitor);
    emitter.on(events.leftMonitor, handleLeftMonitor);

    return () => {
      window.removeEventListener('resize', checkMobile);
      emitter.off(events.loadingScreenDone, handleLoadingDone);
      emitter.off(events.enterMonitor, handleEnterMonitor);
      emitter.off(events.leftMonitor, handleLeftMonitor);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      timeRef.current = timeString;
      if (timeComplete) {
        setCurrentTime(timeString);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeComplete]);

  useEffect(() => {
    if (timeComplete) {
      const timer = setTimeout(() => setShowMute(true), 250);
      return () => clearTimeout(timer);
    }
  }, [timeComplete]);

  useEffect(() => {
    if (showMute) {
      const timer = setTimeout(() => setShowInfo(true), 250);
      return () => clearTimeout(timer);
    }
  }, [showMute]);

  useEffect(() => {
    if (showInfo) {
      emitter.emit(events.keydown, { key: '_AUTO_' });
    }
  }, [showInfo]);

  if (!isInteractive && !isVisible) return null;

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={panelVariants}
      className="interface-wrapper absolute"
      style={{
        position: 'absolute',
        top: isMobile ? '24px' : '64px',
        left: isMobile ? '24px' : '64px',
      }}
    >
      {isVisible && (
        <div className="flex flex-col items-start justify-start w-full">
          <div style={rowContainerStyle}>
            <TypewriterText
              text="Henry Heffernan"
              onComplete={() => setNameComplete(true)}
            />
          </div>

          {nameComplete && (
            <div style={rowContainerStyle}>
              <TypewriterText
                text="Software Engineer"
                onComplete={() => setTitleComplete(true)}
              />
            </div>
          )}

          {titleComplete && (
            <div style={lastRowStyle}>
              <div style={{ ...rowContainerStyle, ...lastRowChildStyle }}>
                {timeComplete ? (
                  <span className="text-white font-mono">{currentTime}</span>
                ) : (
                  <TypewriterText
                    text={
                      timeRef.current || new Date().toLocaleTimeString()
                    }
                    onComplete={() => setTimeComplete(true)}
                  />
                )}
              </div>

              {showMute && (
                <div style={lastRowChildStyle}>
                  <MuteButton />
                </div>
              )}

              {showInfo && (
                <div style={lastRowChildStyle}>
                  <InfoButton />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
