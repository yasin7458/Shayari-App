import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaHeart, FaCopy, FaInfoCircle } from 'react-icons/fa';

// Global toast trigger helper
export const showToast = (message, type = 'success') => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('shayarana_toast', { detail: { message, type } });
    window.dispatchEvent(event);
  }
};

export const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const handleToast = (e) => {
      clearTimeout(timer);
      setToast(e.detail);
      timer = setTimeout(() => {
        setToast(null);
      }, 3200);
    };

    window.addEventListener('shayarana_toast', handleToast);
    return () => {
      window.removeEventListener('shayarana_toast', handleToast);
      clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'heart':
      case 'favorite':
        return <FaHeart className="text-[#C78375] text-lg animate-pulse" />;
      case 'copy':
        return <FaCopy className="text-[#D5AD70] text-lg" />;
      case 'info':
        return <FaInfoCircle className="text-[#D5AD70] text-lg" />;
      default:
        return <FaCheckCircle className="text-[#D5AD70] text-lg" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] max-w-sm pointer-events-auto transition-all duration-300 ease-out transform translate-y-0 opacity-100">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#241A24]/95 border border-[#D5AD70]/40 text-[#FFF9F3] shadow-card-luxury backdrop-blur-xl">
        <div className="flex-shrink-0">{getIcon()}</div>
        <p className="text-sm font-medium tracking-wide text-[#F2DCC8]">{toast.message}</p>
      </div>
    </div>
  );
};
