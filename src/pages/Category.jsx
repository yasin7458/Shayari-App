import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import { getShayarisByCategory } from '../data/shayariData';
import { ShayariCard } from '../components/ShayariCard';
import { animatePageEnter } from '../animations/gsapAnimations';
import {
  FaSearch,
  FaSortAmountDown,
  FaArrowLeft,
  FaFeatherAlt,
  FaHeart,
  FaCrown,
  FaUserFriends,
  FaCompass,
  FaTrophy,
  FaLaughBeam,
  FaCloudShowersHeavy,
} from 'react-icons/fa';

export const Category = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const pageRef = useRef(null);

  const category = categories.find((c) => c.slug === slug || c.id === slug);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    animatePageEnter(pageRef);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setVisibleCount(12);
    setSearchQuery('');
    setSelectedType('all');
  }, [slug]);

  const rawShayaris = useMemo(() => {
    return category ? getShayarisByCategory(category.id) : [];
  }, [category]);

  const filteredAndSorted = useMemo(() => {
    return rawShayaris
      .filter((item) => {
        if (selectedType !== 'all' && item.type !== selectedType) return false;
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
          tags.includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.likes - a.likes;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        if (sortBy === 'trending') return (b.likes % 13) - (a.likes % 13);
        return 0;
      });
  }, [rawShayaris, searchQuery, selectedType, sortBy]);

  if (!category) {
    return <Navigate to="/all-shayaris" replace />;
  }

  const title = category.title[language] || category.title.en;
  const subtitle = category.subtitle[language] || category.subtitle.en;
  const visibleItems = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'FaHeart':
        return <FaHeart className="text-3xl text-[#C78375]" />;
      case 'FaFeatherAlt':
        return <FaFeatherAlt className="text-3xl text-[#D5AD70]" />;
      case 'FaCloudShowersHeavy':
        return <FaCloudShowersHeavy className="text-3xl text-[#B8A8A5]" />;
      case 'FaCrown':
        return <FaCrown className="text-3xl text-[#D5AD70]" />;
      case 'FaUserFriends':
        return <FaUserFriends className="text-3xl text-[#F2DCC8]" />;
      case 'FaCompass':
        return <FaCompass className="text-3xl text-[#D5AD70]" />;
      case 'FaTrophy':
        return <FaTrophy className="text-3xl text-[#D5AD70]" />;
      case 'FaLaughBeam':
        return <FaLaughBeam className="text-3xl text-[#C78375]" />;
      default:
        return <FaFeatherAlt className="text-3xl text-[#D5AD70]" />;
    }
  };

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/all-shayaris"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5AD70] hover:text-[#FFF9F3] transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>{t('details.back') || 'Back to All Categories'}</span>
        </Link>
      </div>

      {/* Category Banner */}
      <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#713B4A]/50 via-[#3B1E29]/70 to-[#17121C] border border-[#D5AD70]/30 shadow-card-luxury mb-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D5AD70]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-[#17121C]/80 border border-[#D5AD70]/40 flex items-center justify-center shadow-gold-glow flex-shrink-0">
            {renderCategoryIcon(category.icon)}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D5AD70]">
              Category Anthology
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FFF9F3] mt-1">
              {title}
            </h1>
            <p className="font-serif italic text-sm md:text-base text-[#F2DCC8]/80 mt-2">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center md:items-end justify-center px-6 py-3 rounded-2xl bg-[#17121C]/60 border border-[#D5AD70]/20">
          <span className="font-serif text-3xl font-bold gold-text-gradient">
            {rawShayaris.length}
          </span>
          <span className="text-[11px] uppercase text-[#B8A8A5] tracking-wider">
            Total Shayaris
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-3xl p-5 glass-panel border border-[#D5AD70]/25 shadow-card-luxury mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D5AD70]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(12);
            }}
            placeholder={`Search within ${title}...`}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] placeholder-[#B8A8A5]/60 focus:outline-none focus:border-[#D5AD70]"
          />
        </div>

        {/* 2-lines / 4-lines switch */}
        <div className="flex items-center gap-1.5 bg-[#17121C]/70 p-1 rounded-xl border border-[#D5AD70]/20">
          {['all', '2-lines', '4-lines'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setVisibleCount(12);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] shadow-sm'
                  : 'text-[#B8A8A5] hover:text-[#F2DCC8]'
              }`}
            >
              {type === 'all' ? 'All' : type === '2-lines' ? '2 Lines' : '4 Lines'}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <FaSortAmountDown className="text-[#D5AD70] text-sm" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#17121C] border border-[#D5AD70]/30 text-xs font-medium text-[#F2DCC8] focus:outline-none"
          >
            <option value="popular">{t('filters.popular') || 'Most Popular'}</option>
            <option value="newest">{t('filters.newest') || 'Newest'}</option>
            <option value="trending">{t('filters.trending') || 'Trending'}</option>
          </select>
        </div>
      </div>

      {/* Grid of Shayari Cards */}
      {filteredAndSorted.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#241A24]/40 border border-[#D5AD70]/20 p-8">
          <FaFeatherAlt className="text-4xl text-[#713B4A] mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-serif font-bold text-[#F2DCC8] mb-2">
            {t('filters.noResultsTitle') || 'No Shayaris Found'}
          </h3>
          <p className="text-sm text-[#B8A8A5] max-w-md mx-auto mb-6">
            No matching couplets found in this category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
            }}
            className="px-6 py-2.5 rounded-full bg-[#713B4A] text-xs font-semibold text-[#FFF9F3] border border-[#D5AD70]/50"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((shayari) => (
              <ShayariCard key={shayari.id} shayari={shayari} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-14 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] font-semibold text-sm shadow-gold-glow hover:scale-105 transition-all"
              >
                Load More ({filteredAndSorted.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
