import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaGlobe, FaCheck, FaChevronDown } from 'react-icons/fa';

export const LanguageSwitcher = ({ isMobile = false, onCloseMobile = null }) => {
  const { language, setLanguage, languageOptions } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
    if (onCloseMobile) onCloseMobile();
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#B8A8A5] mb-2 px-1">
          Select Language / भाषा चुनें / ભાષા પસંદ કરો
        </div>
        <div className="grid grid-cols-3 gap-2">
          {languageOptions.map((opt) => {
            const isActive = language === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => handleSelect(opt.code)}
                className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#713B4A] border-[#D5AD70] text-[#FFF9F3] shadow-gold-glow'
                    : 'bg-[#241A24]/70 border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8] hover:border-[#D5AD70]/40'
                }`}
              >
                <span className="text-base font-semibold">{opt.label}</span>
                <span className="text-[11px] opacity-75">{opt.sublabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D5AD70]/30 bg-[#241A24]/80 text-[#F2DCC8] hover:bg-[#713B4A]/40 hover:border-[#D5AD70]/60 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#D5AD70]/50"
        aria-expanded={isOpen}
      >
        <FaGlobe className="text-[#D5AD70] text-sm" />
        <span className="text-sm font-medium">{currentOption.label}</span>
        <FaChevronDown className={`text-[10px] text-[#D5AD70] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl glass-dropdown border border-[#D5AD70]/35 py-2 shadow-2xl z-50 transform origin-top-right transition-all">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#B8A8A5] uppercase tracking-wider border-b border-[#D5AD70]/15">
            Language / भाषा / ભાષા
          </div>
          {languageOptions.map((opt) => {
            const isSelected = language === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => handleSelect(opt.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-sm transition-colors duration-150 ${
                  isSelected
                    ? 'bg-[#713B4A]/60 text-[#FFF9F3] font-semibold'
                    : 'text-[#F2DCC8]/80 hover:bg-[#713B4A]/30 hover:text-[#FFF9F3]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-[15px]">{opt.label}</span>
                  <span className="text-xs text-[#B8A8A5]">{opt.sublabel}</span>
                </div>
                {isSelected && <FaCheck className="text-[#D5AD70] text-xs" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
