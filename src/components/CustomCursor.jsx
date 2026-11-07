import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(false);
    } else {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer');

      setIsPointer(Boolean(isInteractive));
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central Gold Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D5AD70] pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Outer Follower Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#D5AD70]/40 pointer-events-none z-[999998] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          isPointer
            ? 'w-10 h-10 bg-[#D5AD70]/10 border-[#D5AD70] scale-110'
            : 'w-7 h-7 scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};
