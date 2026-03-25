'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  delay?: number;
  startDelay?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  onComplete,
  delay = 50,
  startDelay = 0,
  className = '',
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep the callback ref stable to avoid re-triggering the effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const typeNextChar = useCallback(
    (index: number) => {
      if (index >= text.length) {
        setIsComplete(true);
        onCompleteRef.current?.();
        return;
      }

      const randomDelay = delay + Math.random() * 50;

      setTimeout(() => {
        setDisplayText(text.substring(0, index + 1));
        typeNextChar(index + 1);
      }, randomDelay);
    },
    [text, delay]
  );

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      typeNextChar(0);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay, typeNextChar]);

  if (!hasStarted) return null;

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="blinking-cursor inline-block ml-1" />}
    </span>
  );
}
