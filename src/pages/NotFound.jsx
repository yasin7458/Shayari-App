import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { animatePageEnter } from '../animations/gsapAnimations';
import { FaCompass, FaFeatherAlt } from 'react-icons/fa';

export const NotFound = () => {
  const { t, getShayariFontClass } = useLanguage();
  const pageRef = useRef(null);

  useEffect(() => {
    animatePageEnter(pageRef);
  }, []);

  return (
    <div ref={pageRef} className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="relative max-w-lg w-full text-center p-8 md:p-12 rounded-3xl glass-panel border border-[#D5AD70]/30 shadow-2xl">
        <FaFeatherAlt className="text-4xl text-[#713B4A] mx-auto mb-4 animate-bounce" />
        <span className="font-serif text-6xl md:text-8xl font-bold gold-text-gradient block mb-2">
          404
        </span>
        <h2 className="text-2xl font-serif font-bold text-[#FFF9F3] mb-4">
          {t('notFound.title') || 'A Vanished Rhyme'}
        </h2>

        {/* Poetic Couplet */}
        <div className="p-6 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/20 my-6">
          <p
            className={`${getShayariFontClass()} text-base md:text-lg text-[#F2DCC8] leading-relaxed whitespace-pre-line font-medium`}
          >
            {t('notFound.couplet') ||
              'मंज़िल तो मिल ही जाएगी भटक कर ही सही,\nगुमराह तो वो हैं जो घर से निकले ही नहीं।'}
          </p>
        </div>

        <p className="text-xs text-[#B8A8A5] max-w-sm mx-auto mb-8">
          {t('notFound.desc') || 'The verse you seek has slipped into the gentle breeze.'}
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-sm font-semibold text-[#FFF9F3] shadow-gold-glow hover:scale-105 transition-all"
        >
          <FaCompass className="text-[#D5AD70]" />
          <span>{t('notFound.homeBtn') || 'Return to SHAYARANA'}</span>
        </Link>
      </div>
    </div>
  );
};
