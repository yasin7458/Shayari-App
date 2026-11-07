import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { allShayaris } from '../data/shayariData';
import { categories } from '../data/categories';
import { ShayariCard } from '../components/ShayariCard';
import { animatePageEnter } from '../animations/gsapAnimations';
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaFeatherAlt,
  FaLayerGroup,
} from 'react-icons/fa';

export const AllShayari = () => {
  const { t, language } = useLanguage();
  const pageRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    animatePageEnter(pageRef);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter & Sort
  const filteredAndSortedShayaris = useMemo(() => {
    return allShayaris
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
        // Line type filter
        if (selectedType !== 'all' && item.type !== selectedType) return false;

        // Search text
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const hiText = (item.content.hi || '').toLowerCase();
        const enText = (item.content.en || '').toLowerCase();
        const guText = (item.content.gu || '').toLowerCase();
        const author = (item.author || '').toLowerCase();
        const tags = item.tags ? item.tags.join(' ').toLowerCase() : '';

        return (
          hiText.includes(q) ||
          enText.includes(q) ||
          guText.includes(q) ||
          author.includes(q) ||
          tags.includes(q) ||
          item.category.includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.likes - a.likes;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        if (sortBy === 'trending') return (b.likes % 17) - (a.likes % 17);
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  const visibleShayaris = filteredAndSortedShayaris.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedShayaris.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#713B4A]/40 border border-[#D5AD70]/30 text-xs font-semibold text-[#F2DCC8] uppercase tracking-widest mb-3">
          <FaLayerGroup />
          <span>{t('hero.statsShayari') || '400+ Shayaris'}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF9F3] mb-4">
          {t('nav.allShayari') || 'Complete Shayari Anthology'}
        </h1>
        <p className="font-serif italic text-base text-[#B8A8A5] leading-relaxed">
          Explore poetry across Romance, Heart-touching, Sad, Attitude, Friendship, Life, Success, and Humor.
        </p>
      </div>

      {/* Control Panel: Search + Filters */}
      <div className="rounded-3xl p-6 glass-panel border border-[#D5AD70]/25 shadow-card-luxury mb-10 space-y-5">
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D5AD70]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              placeholder={t('nav.searchPlaceholder') || 'Search shayari, author, or keyword...'}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] placeholder-[#B8A8A5]/60 focus:outline-none focus:border-[#D5AD70]"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <FaSortAmountDown className="text-[#D5AD70] text-sm" />
            <label className="text-xs text-[#B8A8A5] uppercase font-semibold">
              {t('filters.sortBy') || 'Sort By:'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl bg-[#17121C] border border-[#D5AD70]/30 text-xs font-medium text-[#F2DCC8] focus:outline-none focus:border-[#D5AD70]"
            >
              <option value="popular">{t('filters.popular') || 'Most Popular'}</option>
              <option value="newest">{t('filters.newest') || 'Newest'}</option>
              <option value="trending">{t('filters.trending') || 'Trending'}</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Chips */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#B8A8A5] uppercase tracking-wider">
            <FaFilter className="text-[#D5AD70]" />
            <span>Category:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setVisibleCount(12);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#713B4A] border border-[#D5AD70] text-[#FFF9F3] shadow-gold-glow'
                  : 'bg-[#17121C]/80 border border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8]'
              }`}
            >
              {t('filters.all') || 'All Categories'}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#713B4A] border border-[#D5AD70] text-[#FFF9F3] shadow-gold-glow'
                    : 'bg-[#17121C]/80 border border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8]'
                }`}
              >
                {c.title[language] || c.title.en}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Format Type Filter (2 Lines / 4 Lines) */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#D5AD70]/15">
          <span className="text-xs font-semibold text-[#B8A8A5] uppercase tracking-wider">
            {t('filters.filterByLines') || 'Lines:'}
          </span>
          <div className="flex items-center gap-2">
            {['all', '2-lines', '4-lines'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setVisibleCount(12);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedType === type
                    ? 'bg-[#D5AD70] text-[#17121C] font-bold'
                    : 'bg-[#17121C] text-[#B8A8A5] hover:text-[#F2DCC8]'
                }`}
              >
                {type === 'all'
                  ? t('filters.all') || 'All'
                  : type === '2-lines'
                  ? t('card.lines2') || '2 Lines'
                  : t('card.lines4') || '4 Lines'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[#B8A8A5] mb-6 px-2">
        <span>
          Showing {visibleShayaris.length} of {filteredAndSortedShayaris.length} Shayaris
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="text-[#D5AD70] hover:underline"
          >
            {t('filters.clearSearch') || 'Reset Filters'}
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filteredAndSortedShayaris.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#241A24]/40 border border-[#D5AD70]/20 p-8">
          <FaFeatherAlt className="text-4xl text-[#713B4A] mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-serif font-bold text-[#F2DCC8] mb-2">
            {t('filters.noResultsTitle') || 'No Shayaris Found'}
          </h3>
          <p className="text-sm text-[#B8A8A5] max-w-md mx-auto mb-6">
            {t('filters.noResultsDesc') || 'Try adjusting your search terms or filters.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="px-6 py-2.5 rounded-full bg-[#713B4A] border border-[#D5AD70]/50 text-xs font-semibold text-[#FFF9F3] shadow-gold-glow"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleShayaris.map((shayari) => (
              <ShayariCard key={shayari.id} shayari={shayari} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-14 text-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] font-semibold text-sm shadow-gold-glow hover:scale-105 transition-all"
              >
                Load More Shayaris ({filteredAndSortedShayaris.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
