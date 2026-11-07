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
import { ThreeDTilt } from '../components/ThreeDTilt';
import { ThreeDScene } from '../components/ThreeDScene';
import { ThreeDPoetryCube } from '../components/ThreeDPoetryCube';
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
  FaCube,
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
    <div className="min-h-screen relative overflow-hidden">
      {/* HERO SECTION WITH 3D WEBGL SCENE */}
      <section
        ref={heroContainerRef}
        className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden"
      >
        {/* Interactive 3D WebGL Canvas Layer */}
        <ThreeDScene className="h-[750px] w-full" />

        {/* Ambient Radial Luxury Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-radial from-[#713B4A]/30 via-[#3E1E28]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#D5AD70]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#C78375]/10 rounded-full blur-3xl pointer-events-none z-0" />

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFF9F3] tracking-tight leading-[1.15] drop-shadow-lg">
              {t('hero.headlinePrefix') || 'Every Single Heart'}
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold gold-text-gradient tracking-tight leading-[1.15] drop-shadow-md">
              {t('hero.headlineHighlight') || 'Carries A Silent Tale...'}
            </h2>
          </div>

          {/* Subtitle */}
          <p
            ref={heroSubtitleRef}
            className="font-serif italic text-base sm:text-lg md:text-xl text-[#B8A8A5] max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow"
          >
            {t('hero.subtitle') ||
              'Where whispers turn into immortal rhymes. Immerse yourself in over 400+ curated couplets across Hindi, English, and Gujarati.'}
          </p>

          {/* Primary Action Buttons with 3D tactile elevation */}
          <div
            ref={heroButtonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/all-shayaris"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-[#FFF9F3] font-semibold text-base shadow-gold-glow hover:shadow-gold-glow-lg hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <FaCompass className="text-[#D5AD70] group-hover:rotate-45 transition-transform duration-300" />
              <span>{t('hero.exploreBtn') || 'Explore Shayaris'}</span>
            </Link>

            <button
              onClick={onOpenRandom}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#241A24]/90 hover:bg-[#241A24] border border-[#D5AD70]/40 hover:border-[#D5AD70] text-[#F2DCC8] font-semibold text-base hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 group shadow-md"
            >
              <FaDice className="text-[#D5AD70] text-lg group-hover:rotate-180 transition-transform duration-500" />
              <span>{t('hero.randomBtn') || 'Random Verse'}</span>
            </button>
          </div>

          {/* 3D Interactive Stats Counters */}
          <div
            ref={heroStatsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#D5AD70]/20"
          >
            {[
              { val: '400+', label: t('hero.statsShayari') || 'Shayaris' },
              { val: '8', label: t('hero.statsCategories') || 'Categories' },
              { val: '3', label: t('hero.statsLanguages') || 'Languages' },
              { val: '10K+', label: t('hero.statsLovers') || 'Readers' },
            ].map((stat, idx) => (
              <ThreeDTilt key={idx} maxTilt={15} scale={1.04} className="h-full">
                <div className="p-4 rounded-2xl bg-[#241A24]/75 border border-[#D5AD70]/20 hover:border-[#D5AD70]/60 shadow-card-luxury text-center preserve-3d transition-all">
                  <span
                    className="block font-serif text-2xl md:text-3xl font-bold gold-text-gradient drop-shadow"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {stat.val}
                  </span>
                  <span
                    className="text-xs text-[#B8A8A5] uppercase tracking-wider block mt-1"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* 3D ROTATING POETRY PRISM SHOWCASE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10 text-center">
        <div className="inline-flex items-center gap-2 text-[#D5AD70] text-xs font-semibold uppercase tracking-widest mb-2">
          <FaCube className="animate-spin-3d" />
          <span>Interactive 3D Poetry Prism</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF9F3] mb-2">
          Spin Through Classical Couplets
        </h2>
        <p className="font-serif italic text-sm text-[#B8A8A5] max-w-lg mx-auto mb-6">
          Hover to pause or click controls to rotate the 3D showcase.
        </p>

        <ThreeDPoetryCube shayaris={featuredShayaris} />
      </section>

      {/* DAILY SHAYARI WITH 3D TILT */}
      {dailyShayari && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <ThreeDTilt maxTilt={10} perspective={1200} scale={1.02}>
            <div className="relative rounded-3xl p-8 md:p-12 glass-panel-luxury border border-[#D5AD70]/40 overflow-hidden shadow-2xl preserve-3d">
              {/* Top Tag */}
              <div
                className="flex items-center justify-between mb-6 pb-4 border-b border-[#D5AD70]/20 preserve-3d"
                style={{ transform: 'translateZ(20px)' }}
              >
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

              {/* Couplet Text in 3D Elevation */}
              <div className="my-6 text-center preserve-3d" style={{ transform: 'translateZ(35px)' }}>
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
              <div
                className="mt-8 pt-4 border-t border-[#D5AD70]/20 flex items-center justify-between preserve-3d"
                style={{ transform: 'translateZ(25px)' }}
              >
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
          </ThreeDTilt>
        </section>
      )}

      {/* 8 CATEGORIES SECTION WITH 3D CARDS */}
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

      {/* FEATURED SHAYARIS WITH 3D TILT */}
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

      {/* TRENDING SHAYARIS WITH 3D TILT */}
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

      {/* BOTTOM CALL TO ACTION BANNER WITH 3D TILT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <ThreeDTilt maxTilt={8} scale={1.015}>
          <div className="rounded-3xl p-10 md:p-14 bg-gradient-to-r from-[#713B4A]/85 via-[#3B1E29]/95 to-[#241A24] border border-[#D5AD70]/40 shadow-2xl text-center relative overflow-hidden preserve-3d">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D5AD70]/10 rounded-full blur-3xl pointer-events-none" />
            <h3
              className="font-serif text-2xl md:text-4xl font-bold text-[#FFF9F3] mb-4 drop-shadow"
              style={{ transform: 'translateZ(25px)' }}
            >
              Feeling In The Mood For Spontaneous Poetry?
            </h3>
            <p
              className="font-serif italic text-sm md:text-base text-[#F2DCC8]/90 max-w-xl mx-auto mb-8"
              style={{ transform: 'translateZ(18px)' }}
            >
              Roll the celestial dice and let fate choose a couplet whispered directly to your soul.
            </p>
            <button
              onClick={onOpenRandom}
              style={{ transform: 'translateZ(30px)' }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D5AD70] to-[#C78375] text-[#17121C] font-bold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
            >
              Roll Surprise Verse
            </button>
          </div>
        </ThreeDTilt>
      </section>
    </div>
  );
};
