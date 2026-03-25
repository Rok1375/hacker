'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import emitter, { events } from '../utils/EventEmitter';

const volumeOnIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
    <path
      d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
      stroke="white"
    />
  </svg>
);

const volumeOffIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
    <line x1="23" y1="9" x2="17" y2="15" stroke="white" />
    <line x1="17" y1="9" x2="23" y2="15" stroke="white" />
  </svg>
);

const buttonVariants = {
  hover: {
    scale: 1.2,
    opacity: 0.8,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  active: {
    scale: 0.8,
    opacity: 0.5,
    transition: { duration: 0.1, ease: 'easeOut' },
  },
  default: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

interface MuteButtonProps {
  className?: string;
}

export default function MuteButton({ className = '' }: MuteButtonProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsActive(true);
      e.preventDefault();
      setIsMuted((prev) => !prev);
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    emitter.emit(events.muteToggle, isMuted);
  }, [isMuted]);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      animate={isActive ? 'active' : isHovered ? 'hover' : 'default'}
      variants={buttonVariants}
      className={`icon-control-container bg-black flex items-center justify-center cursor-pointer ${className}`}
      id="prevent-click"
    >
      <motion.div
        id="prevent-click"
        animate={{
          opacity: isActive ? 0.2 : isHovered ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {isMuted ? volumeOffIcon : volumeOnIcon}
      </motion.div>
    </motion.div>
  );
}
