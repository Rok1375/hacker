'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const infoIcon = (
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
    <circle cx="12" cy="12" r="10" stroke="white" />
    <line x1="12" y1="16" x2="12" y2="12" stroke="white" />
    <line x1="12" y1="8" x2="12.01" y2="8" stroke="white" />
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

interface InfoButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function InfoButton({
  className = '',
  onClick,
}: InfoButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsActive(true);
      e.preventDefault();
      onClick?.();
    },
    [onClick]
  );

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
  }, []);

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
        {infoIcon}
      </motion.div>
    </motion.div>
  );
}
