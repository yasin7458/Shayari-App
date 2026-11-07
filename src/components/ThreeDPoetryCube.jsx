import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { showToast } from './Toast';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaCopy,
  FaExternalLinkAlt,
  FaQuoteLeft,
} from 'react-icons/fa';

export const ThreeDPoetryCube = ({ shayaris = [] }) => {
  const { language, t, getShayariFontClass } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const items = shayaris.slice(0, 4);
  if (!items || items.length === 0) return null;

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, items.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const currentShayari = items[currentIndex];
  const favorited = isFavorite(currentShayari.id);

  const handleCopy = () => {
    const text = currentShayari.content[language] || currentShayari.content.hi;
    navigator.clipboard.writeText(text);
    showToast(t('card.copied') || 'Copied to clipboard!', 'copy');
  };

  return (
    <div
      className="relative max-w-3xl mx-auto my-12 px-4"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* 3D Stage Container */}
      <div className="perspective-1500 py-6">
        <div
          className="relative min-h-[360px] md:min-h-[380px] w-full preserve-3d transition-transform duration-700 ease-out"
          style={{
            transform: `rotateY(${-currentIndex * 90}deg)`,
          }}
        >
          {items.map((item, idx) => {
            const angle = idx * 90;
            const text = item.content[language] || item.content.hi;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={item.id}
                className="absolute inset-0 rounded-3xl p-8 md:p-10 glass-panel-luxury border border-[#D5AD70]/40 shadow-card-luxury flex flex-col justify-between text-center backface-hidden preserve-3d"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(280px)`,
                  opacity: isCurrent ? 1 : 0.45,
                  filter: isCurrent ? 'none' : 'blur(2px)',
                  transition: 'opacity 0.6s, filter 0.6s',
                }}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#713B4A]/70 text-[#F2DCC8] border border-[#D5AD70]/30">
                    {t(`categories.${item.category}`) || item.category}
                  </span>
                  <span className="font-mono text-xs text-[#D5AD70]/80">
                    Face {idx + 1}/4
                  </span>
                </div>

                {/* Poetry Text with 3D Pop Out */}
                <div className="my-auto py-4">
                  <FaQuoteLeft className="text-[#D5AD70]/30 text-2xl mx-auto mb-3" />
                  <p
                    className={`${getShayariFontClass()} text-xl md:text-2xl text-[#FFF9F3] font-medium leading-relaxed whitespace-pre-line drop-shadow-md`}
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {text}
                  </p>
                  <div
                    className="mt-4 font-serif italic text-sm text-[#D5AD70]"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    ~ {item.author || 'Anonymous'}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div
                  className="flex items-center justify-between pt-4 border-t border-[#D5AD70]/20"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        const added = toggleFavorite(item.id, e);
                        showToast(
                          added ? t('card.favorited') || 'Added to favorites' : t('card.unfavorited') || 'Removed from favorites',
                          'favorite'
                        );
                      }}
                      className="p-2.5 rounded-full bg-[#17121C] border border-[#D5AD70]/30 text-[#D5AD70] hover:scale-110 transition-transform"
                      title="Favorite"
                    >
                      {isFavorite(item.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2.5 rounded-full bg-[#17121C] border border-[#D5AD70]/30 text-[#B8A8A5] hover:text-[#FFF9F3] hover:scale-110 transition-all"
                      title="Copy"
                    >
                      <FaCopy />
                    </button>
                  </div>

                  <Link
                    to={`/shayari/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#713B4A]/50 border border-[#D5AD70]/40 text-xs font-semibold text-[#F2DCC8] hover:text-[#FFF9F3] transition-colors"
                  >
                    <span>{t('card.readMore') || 'Explore'}</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous 3D Face"
          className="p-3 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-[#D5AD70] hover:bg-[#713B4A] hover:text-[#FFF9F3] hover:border-[#D5AD70] hover:scale-110 transition-all shadow-md focus:outline-none"
        >
          <FaChevronLeft className="text-sm" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlay(false);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-[#D5AD70] shadow-gold-glow'
                  : 'w-2 bg-[#D5AD70]/30 hover:bg-[#D5AD70]/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next 3D Face"
          className="p-3 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-[#D5AD70] hover:bg-[#713B4A] hover:text-[#FFF9F3] hover:border-[#D5AD70] hover:scale-110 transition-all shadow-md focus:outline-none"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};
