import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from './ThreeDTilt';
import {
  FaHeart,
  FaFeatherAlt,
  FaCloudShowersHeavy,
  FaCrown,
  FaUserFriends,
  FaCompass,
  FaTrophy,
  FaLaughBeam,
  FaArrowRight,
} from 'react-icons/fa';

export const CategoryCard = ({ category }) => {
  const { language } = useLanguage();

  if (!category) return null;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'FaHeart':
        return <FaHeart className="text-2xl text-[#C78375] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaFeatherAlt':
        return <FaFeatherAlt className="text-2xl text-[#D5AD70] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaCloudShowersHeavy':
        return <FaCloudShowersHeavy className="text-2xl text-[#B8A8A5] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaCrown':
        return <FaCrown className="text-2xl text-[#D5AD70] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaUserFriends':
        return <FaUserFriends className="text-2xl text-[#F2DCC8] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaCompass':
        return <FaCompass className="text-2xl text-[#D5AD70] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaTrophy':
        return <FaTrophy className="text-2xl text-[#D5AD70] group-hover:scale-125 transition-transform duration-300" />;
      case 'FaLaughBeam':
        return <FaLaughBeam className="text-2xl text-[#C78375] group-hover:scale-125 transition-transform duration-300" />;
      default:
        return <FaFeatherAlt className="text-2xl text-[#D5AD70]" />;
    }
  };

  const title = category.title[language] || category.title.en;
  const subtitle = category.subtitle[language] || category.subtitle.en;

  return (
    <ThreeDTilt maxTilt={15} perspective={1100} scale={1.03} className="h-full">
      <Link
        to={`/category/${category.slug}`}
        className="group relative block h-full p-6 md:p-7 rounded-3xl bg-gradient-to-br from-[#291D29]/90 via-[#241A24]/85 to-[#17121C] border border-[#D5AD70]/25 hover:border-[#D5AD70]/60 shadow-card-luxury transition-all duration-300 hover:shadow-gold-glow overflow-hidden preserve-3d"
      >
        {/* Background ambient radial glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#713B4A]/25 rounded-full blur-2xl pointer-events-none group-hover:bg-[#713B4A]/45 transition-colors" />

        {/* 3D Ornate corner detail */}
        <div
          className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D5AD70]/40 pointer-events-none group-hover:w-4 group-hover:h-4 group-hover:border-[#D5AD70] transition-all"
          style={{ transform: 'translateZ(15px)' }}
        />

        <div
          className="flex items-start justify-between gap-4 preserve-3d"
          style={{ transform: 'translateZ(35px)' }}
        >
          {/* 3D Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 flex items-center justify-center shadow-inner group-hover:border-[#D5AD70] group-hover:shadow-gold-glow transition-all">
            {renderIcon(category.icon)}
          </div>

          {/* Count Badge */}
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#713B4A]/50 text-[#F2DCC8] border border-[#D5AD70]/30 shadow-sm">
            {category.count}+
          </span>
        </div>

        {/* 3D Title & Subtitle */}
        <div className="mt-5 preserve-3d" style={{ transform: 'translateZ(25px)' }}>
          <h3 className="font-serif font-bold text-lg md:text-xl text-[#FFF9F3] group-hover:text-[#F2DCC8] transition-colors drop-shadow-sm">
            {title}
          </h3>
          <p className="mt-1 text-xs text-[#B8A8A5] line-clamp-1 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 3D Bottom Explore Link */}
        <div
          className="mt-6 pt-4 border-t border-[#D5AD70]/15 flex items-center justify-between text-xs font-medium text-[#D5AD70] preserve-3d"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="group-hover:tracking-wider transition-all">Explore Category</span>
          <FaArrowRight className="text-xs transform group-hover:translate-x-2 transition-transform" />
        </div>
      </Link>
    </ThreeDTilt>
  );
};
