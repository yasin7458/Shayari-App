import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { allShayaris } from '../data/shayariData';
import { categories } from '../data/categories';
import { ShayariCard } from '../components/ShayariCard';
import { animatePageEnter } from '../animations/gsapAnimations';
import {
  FaHeart,
  FaTrashAlt,
  FaSearch,
  FaCompass,
  FaFeatherAlt,
} from 'react-icons/fa';

export const Favorites = () => {
  const { t, language } = useLanguage();
  const { favorites, clearFavorites } = useFavorites();
  const pageRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    animatePageEnter(pageRef);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Retrieve actual objects matching favorite IDs
  const favoriteShayaris = useMemo(() => {
    return allShayaris.filter((s) => favorites.includes(s.id));
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    return favoriteShayaris.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const hiText = (item.content.hi || '').toLowerCase();
      const enText = (item.content.en || '').toLowerCase();
      const guText = (item.content.gu || '').toLowerCase();
      const author = (item.author || '').toLowerCase();

      return hiText.includes(q) || enText.includes(q) || guText.includes(q) || author.includes(q);
    });
  }, [favoriteShayaris, selectedCategory, searchQuery]);

  const handleClearAll = () => {
    const confirm = window.confirm(
      t('favorites.clearConfirm') || 'Are you sure you want to remove all saved favorites?'
    );
    if (confirm) {
      clearFavorites();
    }
  };

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#713B4A]/40 border border-[#D5AD70]/30 text-xs font-semibold text-[#F2DCC8] uppercase tracking-widest mb-3">
          <FaHeart className="text-[#C78375]" />
          <span>{favorites.length} Saved</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF9F3] mb-4">
          {t('favorites.title') || 'Your Treasured Verses'}
        </h1>
        <p className="font-serif italic text-base text-[#B8A8A5] leading-relaxed">
          {t('favorites.subtitle') || 'The couplets that touched your spirit, preserved forever.'}
        </p>
      </div>

      {favoriteShayaris.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl bg-[#241A24]/40 border border-[#D5AD70]/20 p-8 max-w-lg mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#713B4A]/30 border border-[#D5AD70]/40 flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-2xl text-[#C78375] animate-pulse" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#F2DCC8] mb-2">
            {t('favorites.emptyTitle') || 'No Favorites Saved Yet'}
          </h3>
          <p className="text-sm text-[#B8A8A5] mb-8 leading-relaxed">
            {t('favorites.emptyDesc') ||
              'Whenever a couplet touches your soul, tap the heart icon to treasure it here.'}
          </p>
          <Link
            to="/all-shayaris"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-sm font-semibold text-[#FFF9F3] shadow-gold-glow hover:scale-105 transition-all"
          >
            <FaCompass className="text-[#D5AD70]" />
            <span>{t('favorites.exploreBtn') || 'Explore Anthology'}</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Controls Bar */}
          <div className="rounded-3xl p-5 glass-panel border border-[#D5AD70]/25 shadow-card-luxury mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D5AD70]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search within favorites..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] placeholder-[#B8A8A5]/60 focus:outline-none focus:border-[#D5AD70]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-[#713B4A] text-[#FFF9F3] border border-[#D5AD70]'
                    : 'bg-[#17121C] text-[#B8A8A5]'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-[#713B4A] text-[#FFF9F3] border border-[#D5AD70]'
                      : 'bg-[#17121C] text-[#B8A8A5] hover:text-[#F2DCC8]'
                  }`}
                >
                  {c.title[language] || c.title.en}
                </button>
              ))}
            </div>

            {/* Clear All Button */}
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-300 hover:bg-red-900/60 transition-colors whitespace-nowrap"
            >
              <FaTrashAlt />
              <span>{t('favorites.clearAll') || 'Clear All'}</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((shayari) => (
              <ShayariCard key={shayari.id} shayari={shayari} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
