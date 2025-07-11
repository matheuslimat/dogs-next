'use client';

import React, { useState, useEffect } from 'react';
import styles from './RotatingHeadline.module.css';

interface RotatingHeadlineProps {
  texts: string[];
  period?: number;
  fontClassName?: string;
}

export default function RotatingHeadline({
  texts,
  period = 5000,
  fontClassName = '',
}: RotatingHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (texts.length <= 1) return;

    const intervalId = setInterval(() => {
      setIsFading(true);
      const timeoutId = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsFading(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }, period);

    return () => clearInterval(intervalId);
  }, [texts, period]);

  return (
    <h1
      className={`${fontClassName} ${styles.headline} ${
        isFading ? styles.fading : ''
      }`}
    >
      {texts[currentIndex]}
    </h1>
  );
}