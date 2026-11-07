import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onFinish }) => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Number increment animation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12 + 6);
      });
    }, 80);

    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .to(ringRef.current, {
        rotation: 360,
        duration: 2.2,
        repeat: 0,
        ease: 'power2.inOut',
      }, 0)
      .to(containerRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.05,
        duration: 0.75,
        delay: 0.6,
        ease: 'power3.inOut',
        pointerEvents: 'none',
      });

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#17121C] text-[#FFF9F3]"
    >
      <div className="relative flex flex-col items-center">
        {/* Ornate Gold Ring & Spinner */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D5AD70] border-r-[#C78375] border-b-[#713B4A]"
            style={{ animation: 'spin 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
          />
          <div className="absolute inset-2 rounded-full border border-[#D5AD70]/20 animate-pulse" />

          {/* Calligraphic Monogram */}
          <div
            ref={logoRef}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#713B4A] to-[#241A24] border border-[#D5AD70]/40 flex items-center justify-center shadow-gold-glow"
          >
            <span className="font-serif text-3xl font-bold gold-text-gradient select-none">
              श
            </span>
          </div>
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="mt-6 flex flex-col items-center text-center">
          <h1 className="font-display text-2xl tracking-[0.3em] font-bold text-[#F2DCC8] uppercase">
            SHAYARANA
          </h1>
          <p className="mt-1 font-serif italic text-sm text-[#B8A8A5] tracking-widest">
            हर लफ़्ज़ में एक एहसास...
          </p>

          {/* Progress Indicator */}
          <div className="mt-6 w-48 h-1 bg-[#241A24] rounded-full overflow-hidden border border-[#D5AD70]/20">
            <div
              className="h-full bg-gradient-to-r from-[#713B4A] via-[#D5AD70] to-[#C78375] transition-all duration-150 ease-out"
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
          <span className="mt-2 text-xs font-mono text-[#D5AD70]/80 tracking-wider">
            {Math.min(percent, 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
