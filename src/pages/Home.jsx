import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import {
  getDailyShayari,
  getFeaturedShayaris,
  getTrendingShayaris,
  getRecentlyAddedShayaris,
} from '../data/shayariData';
import { ShayariCard } from '../components/ShayariCard';
import { CategoryCard } from '../components/CategoryCard';
import { animateHero, animateCardsStagger } from '../animations/gsapAnimations';
import {
  FaFeatherAlt,
  FaDice,
  FaCompass,
  FaFire,
  FaCalendarDay,
  FaArrowRight,
  FaStar,
  FaClock,
} from 'react-icons/fa';

export const Home = ({ onOpenRandom, onOpenSearch }) => {
  const { t, language, getShayariFontClass } = useLanguage();
  const heroContainerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroStatsRef = useRef(null);

  const categoriesGridRef = useRef(null);
  const featuredGridRef = useRef(null);
  const trendingGridRef = useRef(null);

  const [dailyShayari] = useState(() => getDailyShayari());
  const [featuredShayaris] = useState(() => getFeaturedShayaris(6));
  const [trendingShayaris] = useState(() => getTrendingShayaris(6));
  const [recentShayaris] = useState(() => getRecentlyAddedShayaris(6));

  useEffect(() => {
    // Run GSAP Hero animations
    const tl = animateHero(
      heroContainerRef,
      heroTitleRef,
      heroSubtitleRef,
      heroButtonsRef,
      heroStatsRef
    );

    // Stagger categories & featured cards on scroll
    animateCardsStagger(categoriesGridRef);
    animateCardsStagger(featuredGridRef);
    animateCardsStagger(trendingGridRef);

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section
        ref={heroContainerRef}
        className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden"
      >
        {/* Ambient Radial Luxury Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-radial from-[#713B4A]/35 via-[#3E1E28]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#D5AD70]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#C78375]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#241A24]/90 border border-[#D5AD70]/30 shadow-gold-glow mb-6">
            <FaFeatherAlt className="text-[#D5AD70] text-xs" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#F2DCC8]">
              {t('hero.tag') || 'Timeless Multilingual Poetry Portal'}
            </span>
          </div>

          {/* Animated Main Headline */}
          <div ref={heroTitleRef} className="space-y-2 mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFF9F3] tracking-tight leading-[1.15]">
              {t('hero.headlinePrefix') || 'Every Single Heart'}
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold gold-text-gradient tracking-tight leading-[1.15]">
              {t('hero.headlineHighlight') || 'Carries A Silent Tale...'}
            </h2>
          </div>

          {/* Subtitle */}
          <p
            ref={heroSubtitleRef}
            className="font-serif italic text-base sm:text-lg md:text-xl text-[#B8A8A5] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.subtitle') ||
              'Where whispers turn into immortal rhymes. Immerse yourself in over 400+ curated couplets across Hindi, English, and Gujarati.'}
          </p>

          {/* Primary Action Buttons */}
          <div
            ref={heroButtonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/all-shayaris"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] font-semibold text-base shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <FaCompass className="text-[#D5AD70] group-hover:rotate-45 transition-transform duration-300" />
              <span>{t('hero.exploreBtn') || 'Explore Shayaris'}</span>
            </Link>

            <button
              onClick={onOpenRandom}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#241A24]/80 hover:bg-[#241A24] border border-[#D5AD70]/30 hover:border-[#D5AD70]/70 text-[#F2DCC8] font-semibold text-base transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <FaDice className="text-[#D5AD70] text-lg group-hover:rotate-180 transition-transform duration-500" />
              <span>{t('hero.randomBtn') || 'Random Verse'}</span>
            </button>
          </div>

          {/* Stats Counters */}
          <div
            ref={heroStatsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#D5AD70]/20"
          >
            <div className="p-4 rounded-2xl bg-[#241A24]/50 border border-[#D5AD70]/15">
              <span className="block font-serif text-2xl md:text-3xl font-bold gold-text-gradient">
                400+
              </span>
              <span className="text-xs text-[#B8A8A5] uppercase tracking-wider">
                {t('hero.statsShayari') || 'Shayaris'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#241A24]/50 border border-[#D5AD70]/15">
              <span className="block font-serif text-2xl md:text-3xl font-bold gold-text-gradient">
                8
              </span>
              <span className="text-xs text-[#B8A8A5] uppercase tracking-wider">
                {t('hero.statsCategories') || 'Categories'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#241A24]/50 border border-[#D5AD70]/15">
              <span className="block font-serif text-2xl md:text-3xl font-bold gold-text-gradient">
                3
              </span>
              <span className="text-xs text-[#B8A8A5] uppercase tracking-wider">
                {t('hero.statsLanguages') || 'Languages'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#241A24]/50 border border-[#D5AD70]/15">
              <span className="block font-serif text-2xl md:text-3xl font-bold gold-text-gradient">
                10K+
              </span>
              <span className="text-xs text-[#B8A8A5] uppercase tracking-wider">
                {t('hero.statsLovers') || 'Readers'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY SHAYARI SECTION */}
      {dailyShayari && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="relative rounded-3xl p-8 md:p-10 glass-panel-luxury border border-[#D5AD70]/40 overflow-hidden shadow-2xl">
            {/* Top Tag */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#D5AD70]/20">
              <div className="flex items-center gap-2">
                <FaCalendarDay className="text-[#D5AD70] text-base" />
                <span className="font-serif font-semibold text-sm tracking-widest uppercase text-[#F2DCC8]">
                  {t('sections.dailyTitle') || 'Daily Couplet'}
                </span>
              </div>
              <span className="text-xs font-mono text-[#D5AD70] px-3 py-1 rounded-full bg-[#713B4A]/50 border border-[#D5AD70]/30">
                {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Couplet Text */}
            <div className="my-4 text-center">
              <p
                className={`${getShayariFontClass()} text-xl md:text-3xl font-medium text-[#FFF9F3] leading-relaxed whitespace-pre-line drop-shadow-md`}
              >
                {dailyShayari.content[language] || dailyShayari.content.hi}
              </p>
              <div className="mt-4 font-serif italic text-sm text-[#D5AD70]">
                ~ {dailyShayari.author}
              </div>
            </div>

            {/* Quick Link to Details */}
            <div className="mt-8 pt-4 border-t border-[#D5AD70]/20 flex items-center justify-between">
              <span className="text-xs text-[#B8A8A5] uppercase tracking-wider">
                Category: {t(`categories.${dailyShayari.category}`) || dailyShayari.category}
              </span>
              <Link
                to={`/shayari/${dailyShayari.id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5AD70] hover:text-[#FFF9F3] transition-colors"
              >
                <span>{t('sections.viewDetails') || 'View Details'}</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 8 CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#D5AD70] text-xs font-semibold uppercase tracking-widest mb-2">
              <FaCompass />
              <span>{t('sections.categoriesSubtitle') || 'Find Your Mood'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF9F3]">
              {t('sections.categoriesTitle') || 'Explore Categories'}
            </h2>
          </div>
          <Link
            to="/all-shayaris"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D5AD70] hover:text-[#FFF9F3] mt-4 md:mt-0 transition-colors"
          >
            <span>{t('sections.viewAll') || 'View All Categories'}</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div
          ref={categoriesGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* FEATURED SHAYARIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#D5AD70] text-xs font-semibold uppercase tracking-widest mb-2">
              <FaStar />
              <span>{t('sections.featuredSubtitle') || 'Curated Classics'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF9F3]">
              {t('sections.featuredTitle') || 'Featured Masterpieces'}
            </h2>
          </div>
          <Link
            to="/all-shayaris"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D5AD70] hover:text-[#FFF9F3] mt-4 md:mt-0 transition-colors"
          >
            <span>{t('sections.viewAll') || 'View All'}</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div
          ref={featuredGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredShayaris.map((shayari) => (
            <ShayariCard key={shayari.id} shayari={shayari} />
          ))}
        </div>
      </section>

      {/* TRENDING SHAYARIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#C78375] text-xs font-semibold uppercase tracking-widest mb-2">
              <FaFire />
              <span>{t('sections.trendingSubtitle') || 'Most Loved Verses'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF9F3]">
              {t('sections.trendingTitle') || 'Trending Now'}
            </h2>
          </div>
          <Link
            to="/all-shayaris"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D5AD70] hover:text-[#FFF9F3] mt-4 md:mt-0 transition-colors"
          >
            <span>{t('sections.viewAll') || 'View All'}</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div
          ref={trendingGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {trendingShayaris.map((shayari) => (
            <ShayariCard key={shayari.id} shayari={shayari} />
          ))}
        </div>
      </section>

      {/* RECENTLY ADDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#D5AD70] text-xs font-semibold uppercase tracking-widest mb-2">
              <FaClock />
              <span>{t('sections.recentlyAddedSubtitle') || 'Fresh Verses'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF9F3]">
              {t('sections.recentlyAddedTitle') || 'Newly Curated'}
            </h2>
          </div>
          <Link
            to="/all-shayaris"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D5AD70] hover:text-[#FFF9F3] mt-4 md:mt-0 transition-colors"
          >
            <span>{t('sections.viewAll') || 'View All'}</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentShayaris.map((shayari) => (
            <ShayariCard key={shayari.id} shayari={shayari} />
          ))}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <div className="rounded-3xl p-10 md:p-14 bg-gradient-to-r from-[#713B4A]/80 via-[#3B1E29]/90 to-[#241A24] border border-[#D5AD70]/40 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D5AD70]/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="font-serif text-2xl md:text-4xl font-bold text-[#FFF9F3] mb-4">
            Feeling In The Mood For Spontaneous Poetry?
          </h3>
          <p className="font-serif italic text-sm md:text-base text-[#F2DCC8]/90 max-w-xl mx-auto mb-8">
            Roll the celestial dice and let fate choose a couplet whispered directly to your soul.
          </p>
          <button
            onClick={onOpenRandom}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D5AD70] to-[#C78375] text-[#17121C] font-bold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 transition-transform"
          >
            Roll Surprise Verse
          </button>
        </div>
      </section>
    </div>
  );
};
