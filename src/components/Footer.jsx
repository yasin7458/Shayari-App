import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import { showToast } from './Toast';
import {
  FaHeart,
  FaPaperPlane,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaQuoteLeft,
} from 'react-icons/fa';

export const Footer = () => {
  const { t, language, setLanguage, languageOptions } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }
    showToast('Subscribed! Welcome to the literary circle.', 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#1E1722] via-[#17121C] to-[#120D16] border-t border-[#D5AD70]/20 text-[#B8A8A5] pt-16 pb-12 mt-20">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#713B4A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Poetic Couplet Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <FaQuoteLeft className="text-[#D5AD70]/30 text-2xl mx-auto mb-3" />
          <p className="font-serif italic text-lg md:text-xl text-[#F2DCC8] leading-relaxed">
            {t('footer.quote') || 'लफ़्ज़ों का ये कारवां कभी ठहरता नहीं, जो दिल से निकलता है वो कभी मरता नहीं।'}
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D5AD70] to-transparent mx-auto mt-4" />
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D5AD70]/15">
          {/* Col 1: Brand Info (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#713B4A] border border-[#D5AD70]/40 flex items-center justify-center shadow-gold-glow">
                <span className="font-serif text-xl font-bold text-[#F2DCC8]">श</span>
              </div>
              <span className="font-display text-2xl font-bold tracking-[0.2em] uppercase gold-text-gradient">
                SHAYARANA
              </span>
            </Link>
            <p className="text-sm text-[#B8A8A5] leading-relaxed max-w-sm">
              {t('brandDescription') ||
                'The ultimate realm of soul-stirring poetry — an exquisite symphony of timeless couplets across Hindi, English, and Gujarati.'}
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#F2DCC8] mb-2">
                Join the Poetry Circle
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="flex-1 px-4 py-2 rounded-xl bg-[#241A24]/90 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] focus:outline-none focus:border-[#D5AD70] placeholder-[#B8A8A5]/50"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2 rounded-xl bg-[#713B4A] border border-[#D5AD70]/50 text-[#F2DCC8] hover:bg-[#8A4A5B] hover:text-[#FFF9F3] transition-all"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Categories (Part 1) */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#F2DCC8] tracking-wider mb-4 border-l-2 border-[#D5AD70] pl-2.5">
              {t('footer.categories') || 'Categories'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-[#F2DCC8] hover:translate-x-1 transition-all inline-block"
                  >
                    {cat.title[language] || cat.title.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories (Part 2) */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#F2DCC8] tracking-wider mb-4 border-l-2 border-[#D5AD70] pl-2.5">
              {t('sections.categoriesTitle') || 'Explore More'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(4, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-[#F2DCC8] hover:translate-x-1 transition-all inline-block"
                  >
                    {cat.title[language] || cat.title.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Languages */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#F2DCC8] tracking-wider mb-4 border-l-2 border-[#D5AD70] pl-2.5">
              {t('footer.quickLinks') || 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm mb-5">
              <li>
                <Link to="/all-shayaris" className="hover:text-[#F2DCC8] transition-colors">
                  {t('nav.allShayari') || 'All Shayaris'}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[#F2DCC8] transition-colors">
                  {t('nav.favorites') || 'Favorites'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F2DCC8] transition-colors">
                  {t('nav.about') || 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F2DCC8] transition-colors">
                  {t('nav.contact') || 'Contact'}
                </Link>
              </li>
            </ul>

            {/* Language Quick Switchers */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-[#B8A8A5] mb-2 font-semibold">
                {t('footer.languages') || 'Languages'}:
              </span>
              <div className="flex gap-2">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      language === opt.code
                        ? 'bg-[#713B4A] border-[#D5AD70] text-[#FFF9F3]'
                        : 'bg-[#241A24] border-[#D5AD70]/20 text-[#B8A8A5] hover:text-[#F2DCC8]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8A8A5]">
          <p>© {new Date().getFullYear()} SHAYARANA. {t('footer.copyright')}</p>
          <div className="flex items-center gap-4 text-base text-[#D5AD70]">
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#FFF9F3] transition-colors">
              <FaInstagram />
            </a>
            <a href="#twitter" aria-label="Twitter" className="hover:text-[#FFF9F3] transition-colors">
              <FaTwitter />
            </a>
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#FFF9F3] transition-colors">
              <FaFacebookF />
            </a>
            <a href="#youtube" aria-label="YouTube" className="hover:text-[#FFF9F3] transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
