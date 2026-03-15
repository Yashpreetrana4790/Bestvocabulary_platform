'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Parses stat value like "10K+", "50K+", "100+" into { number, suffix } or null for non-numeric.
 */
function parseStatValue(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: parseInt(match[1], 10), suffix: match[2] || '' };
}

/**
 * Ease-out cubic: fast start, slow end.
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({ value, duration = 1800, className = '', as = 'span' }) {
  const parsed = parseStatValue(value);
  const isNumeric = parsed !== null;

  const [display, setDisplay] = useState(() =>
    isNumeric ? `0${parsed.suffix}` : value
  );
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  // IntersectionObserver: set inView once when element enters viewport
  useEffect(() => {
    if (!isNumeric || !elementRef.current) return;

    const el = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        setInView(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isNumeric]);

  // Animation: run once when inView becomes true; depend on value (primitive) not parsed
  useEffect(() => {
    if (!isNumeric || !inView) return;

    const p = parseStatValue(value);
    if (!p) return;

    const { number, suffix } = p;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(eased * number);
      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(`${number}${suffix}`);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration, isNumeric]);

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  const Component = as;
  return (
    <Component ref={elementRef} className={className}>
      {display}
    </Component>
  );
}
