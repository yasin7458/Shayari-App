import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { allShayaris } from '../data/shayariData';
import { categories } from '../data/categories';
import { useLanguage } from '../context/LanguageContext';
import { FaSearch, FaTimes, FaFeatherAlt, FaArrowRight } from 'react-icons/fa';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const { language, t, getShayariFontClass } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setSelectedCat('all');
      setSelectedType('all');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredShayaris = allShayaris.filter((item) => {
    if (selectedCat !== 'all' && item.category !== selectedCat) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    const hiText = (item.content.hi || '').toLowerCase();
    const enText = (item.content.en || '').toLowerCase();
    const guText = (item.content.gu || '').toLowerCase();
    const author = (item.author || '').toLowerCase();
    const tags = item.tags ? item.tags.join(' ').toLowerCase() : '';

    return (
      hiText.includes(term) ||
      enText.includes(term) ||
      guText.includes(term) ||
      author.includes(term) ||
      tags.includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  const handleSelectShayari = (id) => {
    onClose();
    navigate(`/shayari/${id}`);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 md:pt-24 p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#1C1520] border border-[#D5AD70]/40 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#D5AD70]/20 bg-[#241A24]/70">
          <FaSearch className="text-[#D5AD70] text-lg flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('nav.searchPlaceholder') || 'Search shayari, poet, or emotion...'}
            className="w-full bg-transparent text-[#FFF9F3] text-base md:text-lg focus:outline-none placeholder-[#B8A8A5]/60"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-[#B8A8A5] hover:text-[#FFF9F3]"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full border border-[#D5AD70]/30 text-xs font-medium text-[#F2DCC8] hover:bg-[#713B4A]/50 transition-colors ml-2"
          >
            ESC
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="px-6 py-3 border-b border-[#D5AD70]/10 bg-[#17121C]/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCat === 'all'
                  ? 'bg-[#713B4A] text-[#FFF9F3] font-semibold'
                  : 'bg-[#241A24] text-[#B8A8A5] hover:text-[#F2DCC8]'
              }`}
            >
              {t('filters.all') || 'All'}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCat === c.id
                    ? 'bg-[#713B4A] text-[#FFF9F3] font-semibold'
                    : 'bg-[#241A24] text-[#B8A8A5] hover:text-[#F2DCC8]'
                }`}
              >
                {c.title[language] || c.title.en}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1 rounded-md ${
                selectedType === 'all' ? 'text-[#D5AD70] font-semibold' : 'text-[#B8A8A5]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('2-lines')}
              className={`px-2.5 py-1 rounded-md ${
                selectedType === '2-lines' ? 'text-[#D5AD70] font-semibold' : 'text-[#B8A8A5]'
              }`}
            >
              2 Lines
            </button>
            <button
              onClick={() => setSelectedType('4-lines')}
              className={`px-2.5 py-1 rounded-md ${
                selectedType === '4-lines' ? 'text-[#D5AD70] font-semibold' : 'text-[#B8A8A5]'
              }`}
            >
              4 Lines
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
          <div className="text-xs text-[#B8A8A5] mb-2 px-2">
            {filteredShayaris.length} {t('filters.resultsFound') || 'results found'}
          </div>

          {filteredShayaris.length === 0 ? (
            <div className="py-12 flex flex-col items-center text-center">
              <FaFeatherAlt className="text-3xl text-[#713B4A] mb-3 animate-bounce" />
              <h4 className="text-lg font-serif font-semibold text-[#F2DCC8]">
                {t('filters.noResultsTitle') || 'No Verses Found'}
              </h4>
              <p className="text-xs text-[#B8A8A5] max-w-sm mt-1">
                {t('filters.noResultsDesc') || 'Try searching with another keyword or category.'}
              </p>
            </div>
          ) : (
            filteredShayaris.slice(0, 40).map((item) => {
              const text = item.content[language] || item.content.hi;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectShayari(item.id)}
                  className="group p-4 rounded-2xl bg-[#241A24]/60 border border-[#D5AD70]/15 hover:border-[#D5AD70]/50 hover:bg-[#713B4A]/25 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#713B4A]/50 text-[#F2DCC8] border border-[#D5AD70]/20">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-[#B8A8A5]">
                        {item.type === '2-lines' ? '2 Lines' : '4 Lines'}
                      </span>
                    </div>
                    <p
                      className={`${getShayariFontClass()} text-[#FFF9F3] text-sm md:text-base line-clamp-2 leading-relaxed`}
                    >
                      {text}
                    </p>
                    <div className="mt-1 font-serif italic text-xs text-[#D5AD70]/80">
                      ~ {item.author || 'Anonymous'}
                    </div>
                  </div>
                  <FaArrowRight className="text-[#D5AD70] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
