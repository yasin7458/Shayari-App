import React, { useState } from 'react';
import { getRandomShayari } from '../data/shayariData';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { showToast } from './Toast';
import { ThreeDTilt } from './ThreeDTilt';
import {
  FaTimes,
  FaDice,
  FaHeart,
  FaRegHeart,
  FaCopy,
  FaShareAlt,
  FaVolumeUp,
  FaPalette,
  FaQuoteLeft,
} from 'react-icons/fa';
import { QuoteCardModal } from './QuoteCardModal';

export const RandomShayariModal = ({ isOpen, onClose }) => {
  const { language, t, getShayariFontClass } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentShayari, setCurrentShayari] = useState(() => getRandomShayari());
  const [isRolling, setIsRolling] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const contentText = currentShayari.content[language] || currentShayari.content.hi;
  const favorited = isFavorite(currentShayari.id);

  const handleRollAgain = () => {
    setIsRolling(true);
    setTimeout(() => {
      setCurrentShayari(getRandomShayari());
      setIsRolling(false);
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contentText);
    showToast(t('card.copied') || 'Copied to clipboard!', 'copy');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SHAYARANA Poetry',
          text: `${contentText}\n\n~ ${currentShayari.author}\nVia SHAYARANA`,
          url: window.location.href,
        });
      } catch {
        // ignore
      }
    } else {
      navigator.clipboard.writeText(`${contentText}\n\n~ ${currentShayari.author}`);
      showToast('Verse copied to share!', 'success');
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
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md perspective-1500">
        <ThreeDTilt maxTilt={10} perspective={1200} scale={1.02} className="w-full max-w-xl">
          <div className="relative w-full rounded-3xl bg-[#1E1722]/95 border border-[#D5AD70]/40 shadow-2xl p-6 md:p-8 preserve-3d animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar in 3D */}
            <div
              className="flex items-center justify-between pb-4 border-b border-[#D5AD70]/20 preserve-3d"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="flex items-center gap-2">
                <FaDice className={`text-xl text-[#D5AD70] ${isRolling ? 'animate-spin-3d' : ''}`} />
                <h3 className="text-lg font-serif font-semibold text-[#F2DCC8]">
                  {t('hero.randomBtn') || 'Random Verse'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#B8A8A5] hover:text-[#FFF9F3] hover:bg-[#713B4A]/40 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Verse Display in 3D */}
            <div
              className="my-8 text-center px-4 preserve-3d"
              style={{ transform: 'translateZ(35px)' }}
            >
              <FaQuoteLeft className="text-[#D5AD70]/25 text-2xl mx-auto mb-4" />
              <p
                className={`${getShayariFontClass()} text-[#FFF9F3] text-xl md:text-2xl leading-relaxed whitespace-pre-line font-medium min-h-[100px] flex items-center justify-center drop-shadow-sm`}
              >
                {contentText}
              </p>
              <div className="mt-4 font-serif italic text-sm text-[#D5AD70]">
                ~ {currentShayari.author || 'Anonymous'}
              </div>
            </div>

            {/* Action Row in 3D */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D5AD70]/20 preserve-3d"
              style={{ transform: 'translateZ(25px)' }}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    const added = toggleFavorite(currentShayari.id, e);
                    showToast(
                      added ? t('card.favorited') || 'Added to favorites' : t('card.unfavorited') || 'Removed from favorites',
                      'favorite'
                    );
                  }}
                  className={`p-3 rounded-full border transition-all hover:scale-110 active:scale-95 ${
                    favorited
                      ? 'bg-[#713B4A] border-[#D5AD70] text-[#D5AD70] shadow-gold-glow'
                      : 'bg-[#241A24] border-[#D5AD70]/30 text-[#B8A8A5] hover:text-[#D5AD70]'
                  }`}
                  title="Favorite"
                >
                  {favorited ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-[#B8A8A5] hover:text-[#D5AD70] hover:border-[#D5AD70]/60 hover:scale-110 active:scale-95 transition-all"
                  title="Copy"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-[#B8A8A5] hover:text-[#D5AD70] hover:border-[#D5AD70]/60 hover:scale-110 active:scale-95 transition-all"
                  title="Share"
                >
                  <FaShareAlt />
                </button>
                <button
                  onClick={handleSpeech}
                  className={`p-3 rounded-full border hover:scale-110 active:scale-95 transition-all ${
                    isPlayingAudio
                      ? 'bg-[#713B4A] border-[#D5AD70] text-[#FFF9F3] animate-pulse'
                      : 'bg-[#241A24] border-[#D5AD70]/30 text-[#B8A8A5] hover:text-[#D5AD70]'
                  }`}
                  title="Recite aloud"
                >
                  <FaVolumeUp />
                </button>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="p-3 rounded-full bg-[#241A24] border border-[#D5AD70]/30 text-[#B8A8A5] hover:text-[#D5AD70] hover:border-[#D5AD70]/60 hover:scale-110 active:scale-95 transition-all"
                  title="Download Quote Card"
                >
                  <FaPalette />
                </button>
              </div>

              <button
                onClick={handleRollAgain}
                disabled={isRolling}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] font-medium text-sm hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
              >
                <FaDice className={isRolling ? 'animate-spin-3d' : ''} />
                <span>Roll Another</span>
              </button>
            </div>
          </div>
        </ThreeDTilt>
      </div>

      {showQuoteModal && (
        <QuoteCardModal
          shayari={currentShayari}
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </>
  );
};
