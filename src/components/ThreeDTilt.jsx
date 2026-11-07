import React, { useRef, useState, useEffect } from 'react';
import { prefersReducedMotion } from '../animations/gsapAnimations';

export const ThreeDTilt = ({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.025,
  speed = 400,
  glare = true,
}) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion() || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Invert percentY so tilting up goes positive rotateX
    const rotateX = -percentY * maxTilt;
    const rotateY = percentX * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    if (glare) {
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(213, 173, 112, 0.22) 0%, rgba(242, 220, 200, 0.04) 40%, transparent 80%)`,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d will-change-transform ${className}`}
      style={style}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none z-30 transition-opacity duration-300"
          style={glareStyle}
        />
      )}
    </div>
  );
};
