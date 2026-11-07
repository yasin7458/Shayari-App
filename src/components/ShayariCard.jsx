import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { showToast } from './Toast';
import { ThreeDTilt } from './ThreeDTilt';
import {
  FaHeart,
  FaRegHeart,
  FaCopy,
  FaShareAlt,
  FaPalette,
  FaVolumeUp,
  FaExternalLinkAlt,
  FaQuoteLeft,
} from 'react-icons/fa';
import { QuoteCardModal } from './QuoteCardModal';

export const ShayariCard = ({ shayari }) => {
  const { language, t, getShayariFontClass } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!shayari) return null;

  const contentText = shayari.content[language] || shayari.content.hi;
  const favorited = isFavorite(shayari.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(contentText);
    showToast(t('card.copied') || 'Copied to clipboard!', 'copy');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SHAYARANA Poetry',
          text: `${contentText}\n\n~ ${shayari.author}\nVia SHAYARANA`,
          url: `${window.location.origin}/shayari/${shayari.id}`,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(`${contentText}\n\n~ ${shayari.author}\n${window.location.origin}/shayari/${shayari.id}`);
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
    utterance.rate = 0.85;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <ThreeDTilt maxTilt={12} perspective={1100} scale={1.025} className="h-full">
        <div className="group relative h-full rounded-3xl p-6 md:p-8 bg-[#241A24]/75 border border-[#D5AD70]/20 hover:border-[#D5AD70]/55 backdrop-blur-xl shadow-card-luxury transition-all duration-300 flex flex-col justify-between hover:shadow-gold-glow preserve-3d overflow-hidden">
          {/* 3D Corner Ornaments */}
          <div
            className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D5AD70]/40 pointer-events-none group-hover:w-4 group-hover:h-4 group-hover:border-[#D5AD70] transition-all"
            style={{ transform: 'translateZ(15px)' }}
          />
          <div
            className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D5AD70]/40 pointer-events-none group-hover:w-4 group-hover:h-4 group-hover:border-[#D5AD70] transition-all"
            style={{ transform: 'translateZ(15px)' }}
          />
          <div
            className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D5AD70]/40 pointer-events-none group-hover:w-4 group-hover:h-4 group-hover:border-[#D5AD70] transition-all"
            style={{ transform: 'translateZ(15px)' }}
          />
          <div
            className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D5AD70]/40 pointer-events-none group-hover:w-4 group-hover:h-4 group-hover:border-[#D5AD70] transition-all"
            style={{ transform: 'translateZ(15px)' }}
          />

          {/* 3D Top Badges Layer */}
          <div
            className="flex items-center justify-between gap-2 mb-4 preserve-3d"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#713B4A]/60 text-[#F2DCC8] border border-[#D5AD70]/30 shadow-sm">
                {t(`categories.${shayari.category}`) || shayari.category}
              </span>
              <span className="text-[10px] text-[#B8A8A5] px-2 py-0.5 rounded-full bg-[#17121C]/60 border border-[#D5AD70]/10">
                {shayari.type === '2-lines' ? t('card.lines2') || '2 Lines' : t('card.lines4') || '4 Lines'}
              </span>
            </div>

            <button
              onClick={(e) => {
                const added = toggleFavorite(shayari.id, e);
                showToast(
                  added ? t('card.favorited') || 'Added to favorites' : t('card.unfavorited') || 'Removed from favorites',
                  'favorite'
                );
              }}
              aria-label="Add to favorites"
              className={`p-2.5 rounded-full transition-all duration-200 border hover:scale-110 ${
                favorited
                  ? 'bg-[#713B4A] border-[#D5AD70] text-[#D5AD70] shadow-gold-glow'
                  : 'bg-[#17121C]/60 border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#D5AD70] hover:border-[#D5AD70]/40'
              }`}
            >
              {favorited ? <FaHeart className="text-sm" /> : <FaRegHeart className="text-sm" />}
            </button>
          </div>

          {/* 3D Poetry Verse Layer */}
          <div className="my-3 preserve-3d" style={{ transform: 'translateZ(35px)' }}>
            <FaQuoteLeft className="text-[#D5AD70]/25 text-base mb-2 group-hover:scale-110 transition-transform" />
            <p
              className={`${getShayariFontClass()} text-[#FFF9F3] text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium min-h-[72px] drop-shadow-sm`}
            >
              {contentText}
            </p>
          </div>

          {/* 3D Author Signature */}
          <div
            className="flex items-center justify-between pt-3 border-t border-[#D5AD70]/15 mt-3 preserve-3d"
            style={{ transform: 'translateZ(20px)' }}
          >
            <span className="font-serif italic text-xs md:text-sm text-[#D5AD70]/90">
              ~ {shayari.author || 'Anonymous'}
            </span>
            <span className="text-[11px] text-[#B8A8A5]/70 uppercase tracking-widest font-mono">
              #{shayari.id}
            </span>
          </div>

          {/* 3D Interactive Actions Layer */}
          <div
            className="flex items-center justify-between gap-1.5 pt-4 mt-2 preserve-3d"
            style={{ transform: 'translateZ(28px)' }}
          >
            <div className="flex items-center gap-1.5">
              {/* Copy */}
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-[#17121C]/80 border border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8] hover:border-[#D5AD70]/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                title={t('card.copy') || 'Copy'}
              >
                <FaCopy className="text-xs" />
              </button>
              {/* Share */}
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-[#17121C]/80 border border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8] hover:border-[#D5AD70]/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                title={t('card.share') || 'Share'}
              >
                <FaShareAlt className="text-xs" />
              </button>
              {/* Download Quote Card */}
              <button
                onClick={() => setShowQuoteModal(true)}
                className="p-2.5 rounded-xl bg-[#17121C]/80 border border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8] hover:border-[#D5AD70]/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                title={t('card.downloadCard') || 'Generate Quote Card'}
              >
                <FaPalette className="text-xs" />
              </button>
              {/* Speech Reader */}
              <button
                onClick={handleSpeech}
                className={`p-2.5 rounded-xl border hover:scale-110 active:scale-95 transition-all shadow-sm ${
                  isPlayingAudio
                    ? 'bg-[#713B4A] border-[#D5AD70] text-[#FFF9F3] animate-pulse'
                    : 'bg-[#17121C]/80 border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8] hover:border-[#D5AD70]/50'
                }`}
                title={isPlayingAudio ? t('card.stopAudio') || 'Stop' : t('card.playAudio') || 'Listen'}
              >
                <FaVolumeUp className="text-xs" />
              </button>
            </div>

            {/* View Details Link */}
            <Link
              to={`/shayari/${shayari.id}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#713B4A]/35 hover:bg-[#713B4A]/80 border border-[#D5AD70]/30 hover:border-[#D5AD70] text-xs font-medium text-[#F2DCC8] hover:text-[#FFF9F3] hover:scale-105 transition-all group/link shadow-sm"
            >
              <span>{t('card.readMore') || 'Details'}</span>
              <FaExternalLinkAlt className="text-[10px] group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </ThreeDTilt>

      {showQuoteModal && (
        <QuoteCardModal
          shayari={shayari}
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </>
  );
};
