import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onFinish }) => {
  const containerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
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
        return prev + Math.floor(Math.random() * 14 + 6);
      });
    }, 80);

    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });

    // 3D Gimbal Rings Rotations
    gsap.to(ring1Ref.current, {
      rotationX: 360,
      rotationY: 180,
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(ring2Ref.current, {
      rotationY: 360,
      rotationZ: 180,
      duration: 2.4,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(ring3Ref.current, {
      rotationZ: 360,
      rotationX: 180,
      duration: 3.6,
      repeat: -1,
      ease: 'none',
    });

    tl.fromTo(
      logoRef.current,
      { scale: 0.6, opacity: 0, rotationY: -90 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: 'back.out(1.8)' }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .to(containerRef.current, {
        opacity: 0,
        filter: 'blur(12px)',
        scale: 1.08,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.inOut',
        pointerEvents: 'none',
      });

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#17121C] text-[#FFF9F3] perspective-1000"
    >
      <div className="relative flex flex-col items-center preserve-3d">
        {/* 3D Gyroscope Gimbal Rings */}
        <div className="relative w-36 h-36 flex items-center justify-center preserve-3d">
          {/* Ring 1 */}
          <div
            ref={ring1Ref}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D5AD70] border-b-[#713B4A] opacity-80"
          />
          {/* Ring 2 */}
          <div
            ref={ring2Ref}
            className="absolute inset-2 rounded-full border-2 border-transparent border-r-[#C78375] border-l-[#F2DCC8] opacity-75"
          />
          {/* Ring 3 */}
          <div
            ref={ring3Ref}
            className="absolute inset-4 rounded-full border border-dashed border-[#D5AD70]/40"
          />

          {/* Central 3D Calligraphic Monogram */}
          <div
            ref={logoRef}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#713B4A] via-[#3B1E29] to-[#241A24] border border-[#D5AD70]/60 flex items-center justify-center shadow-gold-glow preserve-3d"
            style={{ transform: 'translateZ(25px)' }}
          >
            <span className="font-serif text-3xl font-bold gold-text-gradient select-none">
              श
            </span>
          </div>
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="mt-8 flex flex-col items-center text-center">
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.3em] font-bold text-[#F2DCC8] uppercase">
            SHAYARANA
          </h1>
          <p className="mt-1 font-serif italic text-sm text-[#B8A8A5] tracking-widest">
            हर लफ़्ज़ में एक एहसास...
          </p>

          {/* 3D Progress Bar */}
          <div className="mt-6 w-48 h-1.5 bg-[#241A24] rounded-full overflow-hidden border border-[#D5AD70]/25 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#713B4A] via-[#D5AD70] to-[#C78375] transition-all duration-150 ease-out shadow-gold-glow"
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
