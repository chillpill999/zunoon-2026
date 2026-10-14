'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  duration?: number;
  scale?: number;
  rotate?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  threshold = 0.12,
  duration = 600,
  scale = 0.98,
  rotate = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fast check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) {
      return rotate ? `rotate(${rotate}deg)` : 'none';
    }

    let translate = '';
    if (direction === 'up') translate = `translateY(${distance}px)`;
    else if (direction === 'down') translate = `translateY(-${distance}px)`;
    else if (direction === 'left') translate = `translateX(${distance}px)`;
    else if (direction === 'right') translate = `translateX(-${distance}px)`;

    const scaleStr = scale !== 1 ? `scale(${scale})` : '';
    const rotStr = rotate ? `rotate(${rotate * 0.5}deg)` : '';

    return `${translate} ${scaleStr} ${rotStr}`.trim() || 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
