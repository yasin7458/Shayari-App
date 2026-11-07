import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useLanguage } from '../context/LanguageContext';
import { FaTimes, FaDownload, FaPalette, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { showToast } from './Toast';

export const QuoteCardModal = ({ shayari, isOpen, onClose }) => {
  const { language, t, getShayariFontClass } = useLanguage();
  const cardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('burgundy');

  if (!isOpen || !shayari) return null;

  const contentText = shayari.content[language] || shayari.content.hi;

  const themes = [
    {
      id: 'burgundy',
      name: 'Royal Burgundy',
      bgClass: 'bg-gradient-to-br from-[#713B4A] via-[#3E1E28] to-[#17121C]',
      border: 'border-[#D5AD70]/40',
      text: 'text-[#FFF9F3]',
      accent: 'text-[#D5AD70]',
    },
    {
      id: 'charcoal',
      name: 'Obsidian Night',
      bgClass: 'bg-gradient-to-br from-[#241A24] via-[#1C151F] to-[#110D15]',
      border: 'border-[#D5AD70]/30',
      text: 'text-[#F2DCC8]',
      accent: 'text-[#D5AD70]',
    },
    {
      id: 'rose',
      name: 'Dusty Rose',
      bgClass: 'bg-gradient-to-br from-[#5E364A] via-[#8A4A5B] to-[#251520]',
      border: 'border-[#F2DCC8]/40',
      text: 'text-[#FFF9F3]',
      accent: 'text-[#F2DCC8]',
    },
    {
      id: 'golden',
      name: 'Imperial Gold',
      bgClass: 'bg-gradient-to-br from-[#402E20] via-[#241A24] to-[#17121C]',
      border: 'border-[#D5AD70]/60',
      text: 'text-[#FFF9F3]',
      accent: 'text-[#D5AD70]',
    },
  ];

  const currentTheme = themes.find((th) => th.id === selectedTheme) || themes[0];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      showToast(t('card.downloadCard') || 'Generating image...', 'info');

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        quality: 0.95,
      });

      const link = document.createElement('a');
      link.download = `shayarana-${shayari.id}-${language}.png`;
      link.href = dataUrl;
      link.click();

      showToast('Image downloaded successfully!', 'success');
      setIsExporting(false);
    } catch (err) {
      console.error('Image export error:', err);
      showToast('Failed to download image. Please try again.', 'info');
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1E1722] border border-[#D5AD70]/30 shadow-2xl overflow-hidden p-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D5AD70]/20">
          <div className="flex items-center gap-2">
            <FaPalette className="text-[#D5AD70]" />
            <h3 className="text-lg font-serif font-semibold text-[#F2DCC8]">
              {t('imageModal.title') || 'Quote Card'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#B8A8A5] hover:text-[#FFF9F3] hover:bg-[#713B4A]/40 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Theme Picker */}
        <div className="my-4">
          <label className="block text-xs font-semibold text-[#B8A8A5] uppercase tracking-wider mb-2">
            {t('imageModal.themeLabel') || 'Background Aura:'}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => setSelectedTheme(th.id)}
                className={`py-2 px-1 text-xs rounded-xl font-medium border transition-all text-center ${
                  selectedTheme === th.id
                    ? 'border-[#D5AD70] bg-[#713B4A]/60 text-[#FFF9F3] shadow-gold-glow'
                    : 'border-[#D5AD70]/20 bg-[#241A24]/60 text-[#B8A8A5] hover:border-[#D5AD70]/40'
                }`}
              >
                {th.name}
              </button>
            ))}
          </div>
        </div>

        {/* Card Preview (Will be exported) */}
        <div className="py-2 flex justify-center">
          <div
            ref={cardRef}
            className={`relative w-full rounded-2xl p-8 border ${currentTheme.border} ${currentTheme.bgClass} shadow-card-luxury text-center flex flex-col justify-between min-h-[340px]`}
          >
            {/* Corner Decorative Borders */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D5AD70]/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D5AD70]/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D5AD70]/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D5AD70]/60 pointer-events-none" />

            {/* Header Monogram */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#D5AD70]/40 flex items-center justify-center bg-[#17121C]/60 mb-1">
                <span className="font-serif text-lg font-bold text-[#D5AD70]">श</span>
              </div>
              <span className="font-display text-[11px] tracking-[0.25em] uppercase text-[#F2DCC8]/80 font-semibold">
                SHAYARANA
              </span>
            </div>

            {/* Poetry Content */}
            <div className="my-6 px-4">
              <FaQuoteLeft className="text-[#D5AD70]/30 text-xl mx-auto mb-3" />
              <p
                className={`${getShayariFontClass()} ${currentTheme.text} text-xl md:text-2xl leading-relaxed whitespace-pre-line font-medium drop-shadow-sm`}
              >
                {contentText}
              </p>
              <FaQuoteRight className="text-[#D5AD70]/30 text-xl mx-auto mt-3" />
            </div>

            {/* Footer / Attribution */}
            <div className="flex items-center justify-between pt-3 border-t border-[#D5AD70]/20 text-xs">
              <span className="font-serif italic text-[#D5AD70]">
                ~ {shayari.author || 'Anonymous'}
              </span>
              <span className="text-[10px] tracking-widest text-[#B8A8A5] uppercase">
                shayarana.com
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-[#D5AD70]/30 text-[#F2DCC8] hover:bg-[#241A24] transition-colors text-sm font-medium"
          >
            {t('imageModal.closeBtn') || 'Close'}
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] hover:shadow-gold-glow transition-all text-sm font-semibold disabled:opacity-50"
          >
            <FaDownload />
            <span>{isExporting ? 'Generating...' : t('imageModal.downloadBtn') || 'Download PNG'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
