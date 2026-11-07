import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  FaSearch,
  FaHeart,
  FaDice,
  FaBars,
  FaTimes,
  FaFeatherAlt,
} from 'react-icons/fa';

export const Navbar = ({ onOpenSearch, onOpenRandom }) => {
  const { t, language } = useLanguage();
  const { favoritesCount } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navbar glass effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') || 'Home' },
    { to: '/all-shayaris', label: t('nav.allShayari') || 'All Shayaris' },
    { to: '/favorites', label: t('nav.favorites') || 'Favorites', badge: favoritesCount },
    { to: '/about', label: t('nav.about') || 'About' },
    { to: '/contact', label: t('nav.contact') || 'Contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#17121C]/92 backdrop-blur-xl border-b border-[#D5AD70]/25 shadow-lg py-3'
            : 'bg-transparent border-b border-[#D5AD70]/10 py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 3D Interactive Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none perspective-1000">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#713B4A] to-[#241A24] border border-[#D5AD70]/40 flex items-center justify-center shadow-gold-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 preserve-3d">
                <span className="font-serif text-xl font-bold text-[#F2DCC8] drop-shadow-sm" style={{ transform: 'translateZ(10px)' }}>
                  श
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] uppercase gold-text-gradient group-hover:tracking-[0.25em] transition-all duration-300">
                  SHAYARANA
                </span>
                <span className="text-[10px] tracking-widest text-[#B8A8A5] -mt-1 font-serif italic hidden sm:block">
                  {t('brandTagline') || 'हर लफ़्ज़ में एक एहसास...'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with 3D tactile lift */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 ${
                      isActive
                        ? 'text-[#FFF9F3] bg-[#713B4A]/60 border border-[#D5AD70]/50 shadow-gold-glow'
                        : 'text-[#B8A8A5] hover:text-[#F2DCC8] hover:bg-[#241A24]/60'
                    }`
                  }
                >
                  {link.label}
                  {link.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#713B4A] border border-[#D5AD70]/60 text-[10px] font-bold text-[#F2DCC8] flex items-center justify-center shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons & Controls with 3D elevation */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Global Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-2.5 rounded-full bg-[#241A24]/75 border border-[#D5AD70]/25 text-[#F2DCC8] hover:text-[#FFF9F3] hover:border-[#D5AD70]/60 hover:bg-[#713B4A]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none shadow-sm"
                title="Search (Ctrl + K)"
              >
                <FaSearch className="text-sm" />
              </button>

              {/* Random Verse Dice Button */}
              <button
                type="button"
                onClick={onOpenRandom}
                aria-label="Random Shayari"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#713B4A]/30 border border-[#D5AD70]/30 text-[#F2DCC8] hover:bg-[#713B4A]/70 hover:border-[#D5AD70] hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs font-medium focus:outline-none shadow-sm group"
                title="Surprise Verse"
              >
                <FaDice className="text-sm text-[#D5AD70] group-hover:rotate-180 transition-transform duration-500" />
                <span>{t('hero.randomBtn') || 'Random'}</span>
              </button>

              {/* Language Switcher Dropdown */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile Drawer Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-full bg-[#241A24]/80 border border-[#D5AD70]/30 text-[#F2DCC8] hover:text-[#FFF9F3] lg:hidden focus:outline-none"
              >
                {isMobileMenuOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Menu Content */}
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#1C1520] border-l border-[#D5AD70]/30 p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#D5AD70]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#713B4A] border border-[#D5AD70]/40 flex items-center justify-center shadow-gold-glow">
                    <span className="font-serif font-bold text-[#F2DCC8]">श</span>
                  </div>
                  <span className="font-display font-bold tracking-widest text-[#F2DCC8] uppercase">
                    SHAYARANA
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#B8A8A5] hover:text-[#FFF9F3]"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="py-6 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                        isActive
                          ? 'bg-[#713B4A] text-[#FFF9F3] font-semibold border border-[#D5AD70]/50'
                          : 'text-[#B8A8A5] hover:bg-[#241A24] hover:text-[#F2DCC8]'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#D5AD70] text-[#17121C] text-xs font-bold">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}

                {/* Mobile Random Verse Trigger */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenRandom();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium text-[#D5AD70] bg-[#713B4A]/25 border border-[#D5AD70]/30 hover:bg-[#713B4A]/40 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <FaDice />
                    <span>{t('hero.randomBtn') || 'Random Verse'}</span>
                  </div>
                  <FaFeatherAlt className="text-xs text-[#D5AD70]" />
                </button>
              </div>

              {/* Mobile Language Switcher Section */}
              <div className="pt-4 border-t border-[#D5AD70]/15">
                <LanguageSwitcher isMobile onCloseMobile={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-[#D5AD70]/15 text-center text-xs text-[#B8A8A5]">
              <p className="font-serif italic text-[#F2DCC8]/80">
                {t('brandTagline') || 'हर लफ़्ज़ में एक एहसास...'}
              </p>
              <p className="mt-1 text-[11px] opacity-70">SHAYARANA Multilingual Platform</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
