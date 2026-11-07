import { romanticShayaris } from './categoriesData/romantic.js';
import { heartTouchingShayaris } from './categoriesData/heartTouching.js';
import { sadShayaris } from './categoriesData/sad.js';
import { attitudeShayaris } from './categoriesData/attitude.js';
import { dostiShayaris } from './categoriesData/dosti.js';
import { lifeShayaris } from './categoriesData/life.js';
import { successShayaris } from './categoriesData/success.js';
import { funnyShayaris } from './categoriesData/funny.js';

export const allShayaris = [
  ...romanticShayaris,
  ...heartTouchingShayaris,
  ...sadShayaris,
  ...attitudeShayaris,
  ...dostiShayaris,
  ...lifeShayaris,
  ...successShayaris,
  ...funnyShayaris,
];

// Helper functions
export const getShayarisByCategory = (categorySlug) => {
  return allShayaris.filter(s => s.category === categorySlug);
};

export const getShayariById = (id) => {
  return allShayaris.find(s => s.id === id);
};

export const getRandomShayari = () => {
  const randomIndex = Math.floor(Math.random() * allShayaris.length);
  return allShayaris[randomIndex];
};

export const getDailyShayari = () => {
  // Deterministic daily pick based on current calendar day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % allShayaris.length;
  return allShayaris[index] || allShayaris[0];
};

export const getTrendingShayaris = (limit = 6) => {
  return [...allShayaris].sort((a, b) => b.likes - a.likes).slice(0, limit);
};

export const getFeaturedShayaris = (limit = 6) => {
  // Curated list across categories
  const featuredIds = ["rom-002", "ht-002", "att-002", "dos-002", "lif-002", "suc-002"];
  const featured = allShayaris.filter(s => featuredIds.includes(s.id));
  return featured.length === limit ? featured : allShayaris.slice(0, limit);
};

export const getRecentlyAddedShayaris = (limit = 6) => {
  return allShayaris.slice(-limit);
};

export const searchShayaris = (query = '', lang = 'hi', category = 'all', type = 'all') => {
  const q = query.trim().toLowerCase();
  return allShayaris.filter(item => {
    // Category filter
    if (category !== 'all' && item.category !== category) return false;
    // Type filter (2-lines / 4-lines)
    if (type !== 'all' && item.type !== type) return false;

    if (!q) return true;

    // Content match across current language or any language
    const currentText = (item.content[lang] || '').toLowerCase();
    const hiText = (item.content.hi || '').toLowerCase();
    const enText = (item.content.en || '').toLowerCase();
    const guText = (item.content.gu || '').toLowerCase();
    const author = (item.author || '').toLowerCase();
    const tagsMatch = item.tags && item.tags.some(t => t.toLowerCase().includes(q));

    return (
      currentText.includes(q) ||
      hiText.includes(q) ||
      enText.includes(q) ||
      guText.includes(q) ||
      author.includes(q) ||
      tagsMatch ||
      item.category.toLowerCase().includes(q)
    );
  });
};
