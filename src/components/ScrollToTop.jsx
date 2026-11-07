import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-50 p-3.5 rounded-full bg-[#241A24]/90 border border-[#D5AD70]/40 text-[#D5AD70] shadow-card-luxury hover:bg-[#713B4A] hover:text-[#FFF9F3] hover:border-[#D5AD70] transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none"
    >
      <FaChevronUp className="text-base group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
};
