import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { animatePageEnter } from '../animations/gsapAnimations';
import { FaFeatherAlt, FaGlobe, FaCrown, FaHeart, FaBookOpen } from 'react-icons/fa';

export const About = () => {
  const { t } = useLanguage();
  const pageRef = useRef(null);

  useEffect(() => {
    animatePageEnter(pageRef);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pillars = [
    {
      icon: <FaGlobe className="text-2xl text-[#D5AD70]" />,
      title: 'Multilingual Symphony',
      desc: 'Every couplet presented authentically in Hindi (हिन्दी), English, and Gujarati (ગુજરાતી) so no emotion is confined by linguistic boundaries.',
    },
    {
      icon: <FaCrown className="text-2xl text-[#D5AD70]" />,
      title: 'Royal Editorial Design',
      desc: 'A bespoke palette of royal Burgundy, Rose Gold, Champagne Cream, and Charcoal that evokes the nostalgia of classical royal mushairas.',
    },
    {
      icon: <FaHeart className="text-2xl text-[#C78375]" />,
      title: 'Literary Sincerity',
      desc: 'Over 400+ hand-curated verses across Romance, Melancholy, Attitude, Friendship, Life, and Motivation with meaningful depth and zero fillers.',
    },
  ];

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#713B4A]/40 border border-[#D5AD70]/30 text-xs font-semibold text-[#F2DCC8] uppercase tracking-widest mb-4">
          <FaFeatherAlt className="text-[#D5AD70]" />
          <span>The Soul of Poetry</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF9F3] mb-4">
          {t('about.title') || 'About SHAYARANA'}
        </h1>
        <p className="font-serif italic text-base md:text-lg text-[#F2DCC8]/80 leading-relaxed">
          {t('about.subtitle') ||
            'A sanctuary of royal aesthetics, rich literature, and boundless emotion.'}
        </p>
      </div>

      {/* Main Story Narrative */}
      <div className="relative rounded-3xl p-8 md:p-14 glass-panel border border-[#D5AD70]/30 shadow-card-luxury mb-16">
        <div className="max-w-3xl mx-auto space-y-6 text-[#FFF9F3]/90 leading-relaxed font-serif text-base md:text-lg">
          <h2 className="text-2xl md:text-3xl font-serif font-bold gold-text-gradient mb-6">
            {t('about.storyTitle') || 'Our Story'}
          </h2>
          <p>
            {t('about.storyText1') ||
              'SHAYARANA is not merely a digital poetry archive; it is an intimate sanctuary for feelings left unexpressed. We have married the ancient grace of Urdu, Hindi, and Gujarati poetic heritage with a luxurious, editorial digital design.'}
          </p>
          <p>
            {t('about.storyText2') ||
              'Every couplet is meticulously rendered in three languages — Hindi, English, and Gujarati — ensuring no feeling is bounded by linguistic borders.'}
          </p>

          <div className="p-6 rounded-2xl bg-[#17121C]/80 border-l-4 border-[#D5AD70] italic text-sm text-[#F2DCC8] my-6">
            "लफ़्ज़ों का ये कारवां कभी ठहरता नहीं, जो दिल से निकलता है वो कभी मरता नहीं।"
          </div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#F2DCC8] pt-4">
            {t('about.missionTitle') || 'Our Purpose'}
          </h3>
          <p>
            {t('about.missionText') ||
              'To bring the cadence of classical poetry to modern hearts, whether rejoicing in love, finding solace in sorrow, celebrating friendship, or conquering ambition.'}
          </p>
        </div>
      </div>

      {/* The 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-[#241A24]/70 border border-[#D5AD70]/25 shadow-card-luxury text-center hover:border-[#D5AD70]/60 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#17121C] border border-[#D5AD70]/40 flex items-center justify-center mx-auto mb-5 shadow-inner">
              {pillar.icon}
            </div>
            <h4 className="font-serif font-bold text-lg text-[#FFF9F3] mb-2">{pillar.title}</h4>
            <p className="text-xs text-[#B8A8A5] leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Quote Banner */}
      <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#713B4A]/60 via-[#3B1E29] to-[#17121C] border border-[#D5AD70]/30 text-center">
        <FaBookOpen className="text-3xl text-[#D5AD70] mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-[#F2DCC8] mb-2">
          Preserving Timeless Literature For Every Generation
        </h3>
        <p className="text-xs text-[#B8A8A5] max-w-lg mx-auto">
          Crafted with devotion for poetry lovers across the globe.
        </p>
      </div>
    </div>
  );
};
