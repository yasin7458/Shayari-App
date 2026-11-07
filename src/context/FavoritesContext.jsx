import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('shayarana_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('shayarana_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shayarana_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('shayarana_recent', JSON.stringify(recentlyViewed));
    } catch (err) {
      console.error('Failed to save recent shayaris to localStorage:', err);
    }
  }, [recentlyViewed]);

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const toggleFavorite = (id, event) => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(favId => favId !== id));
      return false; // Removed
    } else {
      setFavorites(prev => [id, ...prev]);

      // Subtle rose-gold confetti burst
      try {
        let origin = { x: 0.5, y: 0.6 };
        if (event && event.clientX && event.clientY) {
          origin = {
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight,
          };
        }
        confetti({
          particleCount: 28,
          spread: 60,
          origin,
          colors: ['#D5AD70', '#F2DCC8', '#C78375', '#713B4A'],
          disableForReducedMotion: true,
          ticks: 120,
        });
      } catch {
        // ignore
      }
      return true; // Added
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const addRecentlyViewed = (id) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
