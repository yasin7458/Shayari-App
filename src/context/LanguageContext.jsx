import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('shayarana_lang');
      if (saved && ['hi', 'en', 'gu'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'hi'; // Default Hindi
  });

  const setLanguage = (newLang) => {
    if (['hi', 'en', 'gu'].includes(newLang)) {
      setLanguageState(newLang);
      try {
        localStorage.setItem('shayarana_lang', newLang);
      } catch (err) {
        console.error('Failed to save language to localStorage:', err);
      }
    }
  };

  // Helper function to resolve dot-notated translation keys e.g. "nav.home"
  const t = (keyPath, fallback = '') => {
    if (!keyPath) return fallback;
    const keys = keyPath.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if translation is missing
        let fallbackCurrent = translations['en'];
        for (const fbKey of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbKey in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fbKey];
          } else {
            return fallback || keyPath;
          }
        }
        return fallbackCurrent || fallback || keyPath;
      }
    }
    return current !== undefined ? current : fallback || keyPath;
  };

  // Returns CSS class for appropriate unicode font
  const getShayariFontClass = () => {
    switch (language) {
      case 'hi':
        return 'font-shayari-hi';
      case 'gu':
        return 'font-shayari-gu';
      case 'en':
      default:
        return 'font-shayari-en';
    }
  };

  // Language display names
  const languageOptions = [
    { code: 'hi', label: 'हिन्दी', sublabel: 'Hindi', flag: '🇮🇳' },
    { code: 'en', label: 'English', sublabel: 'English', flag: '🇬🇧' },
    { code: 'gu', label: 'ગુજરાતી', sublabel: 'Gujarati', flag: '🇮🇳' },
  ];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getShayariFontClass,
        languageOptions,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
