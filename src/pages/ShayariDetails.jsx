import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { allShayaris, getShayariById, getShayarisByCategory } from '../data/shayariData';
import { ShayariCard } from '../components/ShayariCard';
import { ThreeDTilt } from '../components/ThreeDTilt';
import { QuoteCardModal } from '../components/QuoteCardModal';
import { showToast } from '../components/Toast';
import { animatePoetryReveal, animatePageEnter } from '../animations/gsapAnimations';
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaCopy,
  FaShareAlt,
  FaVolumeUp,
  FaPalette,
  FaQuoteLeft,
  FaQuoteRight,
  FaFont,
} from 'react-icons/fa';

export const ShayariDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t, getShayariFontClass } = useLanguage();
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useFavorites();

  const [fontSizeLevel, setFontSizeLevel] = useState('lg'); // 'md', 'lg', 'xl'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const pageRef = useRef(null);
  const poetryContainerRef = useRef(null);

  const shayari = getShayariById(id) || allShayaris[0];

  // Track recently viewed
  useEffect(() => {
    if (shayari?.id) {
      addRecentlyViewed(shayari.id);
    }
  }, [shayari?.id]);

  // Page entrance and line reveal animation
  useEffect(() => {
    animatePageEnter(pageRef);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const anim = animatePoetryReveal(poetryContainerRef);
    return () => {
      if (anim) anim.kill();
    };
  }, [id, language]);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!shayari) return null;

  const contentText = shayari.content[language] || shayari.content.hi;
  const lines = contentText.split('\n');
  const favorited = isFavorite(shayari.id);

  // Find previous and next shayari in global anthology
  const currentIndex = allShayaris.findIndex((s) => s.id === shayari.id);
  const prevShayari = currentIndex > 0 ? allShayaris[currentIndex - 1] : allShayaris[allShayaris.length - 1];
  const nextShayari = currentIndex < allShayaris.length - 1 ? allShayaris[currentIndex + 1] : allShayaris[0];

  // Related shayaris from same category
  const relatedShayaris = getShayarisByCategory(shayari.category)
    .filter((s) => s.id !== shayari.id)
    .slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(contentText);
    showToast(t('card.copied') || 'Copied to clipboard!', 'copy');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SHAYARANA - ${shayari.author}`,
          text: `${contentText}\n\n~ ${shayari.author}\nVia SHAYARANA`,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(`${contentText}\n\n~ ${shayari.author}\n${window.location.href}`);
      showToast('Verse & link copied to share!', 'success');
    }
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech not supported on this browser', 'info');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(contentText);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'md':
        return 'text-xl md:text-2xl';
      case 'xl':
        return 'text-2xl md:text-4xl';
      case 'lg':
      default:
        return 'text-2xl md:text-3xl';
    }
  };

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-xs font-semibold text-[#F2DCC8] hover:text-[#FFF9F3] hover:border-[#D5AD70] transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>{t('details.back') || 'Go Back'}</span>
        </button>

        {/* Font Size Adjuster */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-xs">
          <FaFont className="text-[#D5AD70] text-xs mr-1" />
          <button
            onClick={() => setFontSizeLevel('md')}
            className={`px-2 py-0.5 rounded ${fontSizeLevel === 'md' ? 'bg-[#713B4A] text-[#FFF9F3] font-bold' : 'text-[#B8A8A5]'}`}
          >
            A-
          </button>
          <button
            onClick={() => setFontSizeLevel('lg')}
            className={`px-2 py-0.5 rounded ${fontSizeLevel === 'lg' ? 'bg-[#713B4A] text-[#FFF9F3] font-bold' : 'text-[#B8A8A5]'}`}
          >
            A
          </button>
          <button
            onClick={() => setFontSizeLevel('xl')}
            className={`px-2 py-0.5 rounded ${fontSizeLevel === 'xl' ? 'bg-[#713B4A] text-[#FFF9F3] font-bold' : 'text-[#B8A8A5]'}`}
          >
            A+
          </button>
        </div>
      </div>

      {/* Main Reading Room Pavilion with 3D Physics */}
      <ThreeDTilt maxTilt={8} perspective={1300} scale={1.015}>
        <div className="relative rounded-3xl p-8 md:p-14 bg-gradient-to-br from-[#2D1E2D]/95 via-[#241A24]/95 to-[#17121C] border border-[#D5AD70]/40 shadow-2xl overflow-hidden text-center my-6 preserve-3d">
          {/* Subtle decorative corners */}
          <div
            className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D5AD70]/60 pointer-events-none"
            style={{ transform: 'translateZ(15px)' }}
          />
          <div
            className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D5AD70]/60 pointer-events-none"
            style={{ transform: 'translateZ(15px)' }}
          />
          <div
            className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D5AD70]/60 pointer-events-none"
            style={{ transform: 'translateZ(15px)' }}
          />
          <div
            className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D5AD70]/60 pointer-events-none"
            style={{ transform: 'translateZ(15px)' }}
          />

          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#713B4A]/20 rounded-full blur-3xl pointer-events-none" />

          {/* 3D Category & ID Header */}
          <div
            className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-8 preserve-3d"
            style={{ transform: 'translateZ(25px)' }}
          >
            <Link
              to={`/category/${shayari.category}`}
              className="px-4 py-1 rounded-full bg-[#713B4A]/70 text-[#F2DCC8] border border-[#D5AD70]/40 text-xs font-semibold uppercase tracking-wider hover:bg-[#713B4A] transition-colors"
            >
              {t(`categories.${shayari.category}`) || shayari.category}
            </Link>
            <span className="px-3 py-1 rounded-full bg-[#17121C]/80 text-[#B8A8A5] border border-[#D5AD70]/20 text-xs">
              {shayari.type === '2-lines' ? t('card.lines2') || '2 Lines' : t('card.lines4') || '4 Lines'}
            </span>
            <span className="font-mono text-xs text-[#D5AD70]/80 tracking-widest">
              #{shayari.id}
            </span>
          </div>

          {/* Line-by-Line Poetry Container with 3D Elevation */}
          <div
            ref={poetryContainerRef}
            className="relative z-10 my-10 max-w-2xl mx-auto preserve-3d"
            style={{ transform: 'translateZ(40px)' }}
          >
            <FaQuoteLeft className="text-2xl text-[#D5AD70]/30 mx-auto mb-6" />
            <div className="space-y-4">
              {lines.map((line, idx) => (
                <p
                  key={idx}
                  className={`poetry-line ${getShayariFontClass()} ${getFontSizeClass()} text-[#FFF9F3] font-medium leading-relaxed drop-shadow-md transition-all duration-200`}
                >
                  {line}
                </p>
              ))}
            </div>
            <FaQuoteRight className="text-2xl text-[#D5AD70]/30 mx-auto mt-6" />
          </div>

          {/* 3D Author Signature */}
          <div
            className="relative z-10 mt-8 font-serif italic text-lg text-[#D5AD70] preserve-3d"
            style={{ transform: 'translateZ(25px)' }}
          >
            ~ {shayari.author || 'Anonymous'}
          </div>

          {/* 3D Main Action Bar */}
          <div
            className="relative z-10 mt-10 pt-8 border-t border-[#D5AD70]/20 flex flex-wrap items-center justify-center gap-3 preserve-3d"
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Favorite */}
            <button
              onClick={(e) => {
                const added = toggleFavorite(shayari.id, e);
                showToast(
                  added ? t('card.favorited') || 'Added to favorites' : t('card.unfavorited') || 'Removed from favorites',
                  'favorite'
                );
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all text-sm font-semibold hover:scale-105 active:scale-95 ${
                favorited
                  ? 'bg-[#713B4A] border-[#D5AD70] text-[#D5AD70] shadow-gold-glow'
                  : 'bg-[#17121C]/80 border-[#D5AD70]/30 text-[#F2DCC8] hover:border-[#D5AD70]'
              }`}
            >
              {favorited ? <FaHeart className="text-base" /> : <FaRegHeart className="text-base" />}
              <span>{favorited ? 'Favorited' : t('card.favorite') || 'Favorite'}</span>
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#17121C]/80 border border-[#D5AD70]/30 text-[#F2DCC8] hover:border-[#D5AD70] hover:text-[#FFF9F3] hover:scale-105 active:scale-95 transition-all text-sm font-semibold"
            >
              <FaCopy />
              <span>{t('card.copy') || 'Copy'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#17121C]/80 border border-[#D5AD70]/30 text-[#F2DCC8] hover:border-[#D5AD70] hover:text-[#FFF9F3] hover:scale-105 active:scale-95 transition-all text-sm font-semibold"
            >
              <FaShareAlt />
              <span>{t('card.share') || 'Share'}</span>
            </button>

            {/* Audio Recite */}
            <button
              onClick={handleSpeech}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border hover:scale-105 active:scale-95 transition-all text-sm font-semibold ${
                isPlayingAudio
                  ? 'bg-[#713B4A] border-[#D5AD70] text-[#FFF9F3] animate-pulse'
                  : 'bg-[#17121C]/80 border-[#D5AD70]/30 text-[#F2DCC8] hover:border-[#D5AD70]'
              }`}
            >
              <FaVolumeUp />
              <span>{isPlayingAudio ? t('card.stopAudio') || 'Stop' : t('details.readLoud') || 'Narrate'}</span>
            </button>

            {/* Quote Image Download */}
            <button
              onClick={() => setShowQuoteModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#713B4A] to-[#8A4A5B] border border-[#D5AD70]/60 text-[#FFF9F3] hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all text-sm font-semibold"
            >
              <FaPalette />
              <span>{t('details.generateImage') || 'Create Card'}</span>
            </button>
          </div>
        </div>
      </ThreeDTilt>

      {/* Previous / Next Shayari Navigation with 3D tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <ThreeDTilt maxTilt={10} scale={1.03} className="h-full">
          <Link
            to={`/shayari/${prevShayari.id}`}
            className="p-5 h-full rounded-2xl bg-[#241A24]/75 border border-[#D5AD70]/20 hover:border-[#D5AD70]/50 transition-all flex items-center gap-4 group preserve-3d"
          >
            <FaArrowLeft className="text-[#D5AD70] group-hover:-translate-x-1.5 transition-transform" />
            <div className="text-left overflow-hidden">
              <span className="block text-[11px] uppercase tracking-wider text-[#B8A8A5]">
                {t('details.prev') || 'Previous Couplet'}
              </span>
              <p className="font-serif text-sm text-[#FFF9F3] truncate mt-0.5">
                {prevShayari.content[language] || prevShayari.content.hi}
              </p>
            </div>
          </Link>
        </ThreeDTilt>

        <ThreeDTilt maxTilt={10} scale={1.03} className="h-full">
          <Link
            to={`/shayari/${nextShayari.id}`}
            className="p-5 h-full rounded-2xl bg-[#241A24]/75 border border-[#D5AD70]/20 hover:border-[#D5AD70]/50 transition-all flex items-center justify-between gap-4 group text-right preserve-3d"
          >
            <div className="text-right overflow-hidden flex-1">
              <span className="block text-[11px] uppercase tracking-wider text-[#B8A8A5]">
                {t('details.next') || 'Next Couplet'}
              </span>
              <p className="font-serif text-sm text-[#FFF9F3] truncate mt-0.5">
                {nextShayari.content[language] || nextShayari.content.hi}
              </p>
            </div>
            <FaArrowRight className="text-[#D5AD70] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </ThreeDTilt>
      </div>

      {/* Related Shayaris from Same Category */}
      {relatedShayaris.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#D5AD70]/20">
          <h3 className="font-serif text-2xl font-bold text-[#FFF9F3] mb-8 text-center">
            {t('details.relatedTitle') || 'More In This Mood'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedShayaris.map((item) => (
              <ShayariCard key={item.id} shayari={item} />
            ))}
          </div>
        </div>
      )}

      {/* Quote Card Exporter Modal */}
      {showQuoteModal && (
        <QuoteCardModal
          shayari={shayari}
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </div>
  );
};
