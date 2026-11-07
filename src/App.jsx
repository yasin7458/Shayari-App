import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import { Toast } from './components/Toast';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { RandomShayariModal } from './components/RandomShayariModal';

// Pages
import { Home } from './pages/Home';
import { AllShayari } from './pages/AllShayari';
import { Category } from './pages/Category';
import { ShayariDetails } from './pages/ShayariDetails';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <LanguageProvider>
      <FavoritesProvider>
        {/* Preloader */}
        {loading && <Preloader onFinish={() => setLoading(false)} />}

        <Router>
          {/* Subtle Custom Desktop Cursor */}
          <CustomCursor />

          {/* Floating Global Utilities */}
          <Toast />
          <ScrollToTop />

          {/* Search & Random Modals */}
          <GlobalSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
          <RandomShayariModal
            isOpen={isRandomOpen}
            onClose={() => setIsRandomOpen(false)}
          />

          <div className="flex flex-col min-h-screen bg-[#17121C] text-[#FFF9F3] selection:bg-[#713B4A] selection:text-[#F2DCC8]">
            <Navbar
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenRandom={() => setIsRandomOpen(true)}
            />

            <main className="flex-1">
              <Routes>
                {/* 1. Home */}
                <Route
                  path="/"
                  element={
                    <Home
                      onOpenRandom={() => setIsRandomOpen(true)}
                      onOpenSearch={() => setIsSearchOpen(true)}
                    />
                  }
                />

                {/* 2. All Shayaris */}
                <Route path="/all-shayaris" element={<AllShayari />} />

                {/* 3-10. Dynamic Category Route & Direct Aliases */}
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/romantic" element={<Navigate to="/category/romantic" replace />} />
                <Route path="/heart-touching" element={<Navigate to="/category/heart-touching" replace />} />
                <Route path="/sad" element={<Navigate to="/category/sad" replace />} />
                <Route path="/attitude" element={<Navigate to="/category/attitude" replace />} />
                <Route path="/dosti" element={<Navigate to="/category/dosti" replace />} />
                <Route path="/life" element={<Navigate to="/category/life" replace />} />
                <Route path="/success" element={<Navigate to="/category/success" replace />} />
                <Route path="/funny" element={<Navigate to="/category/funny" replace />} />

                {/* 11. Shayari Details */}
                <Route path="/shayari/:id" element={<ShayariDetails />} />

                {/* 12. Favorites */}
                <Route path="/favorites" element={<Favorites />} />

                {/* 13. About */}
                <Route path="/about" element={<About />} />

                {/* 14. Contact */}
                <Route path="/contact" element={<Contact />} />

                {/* 15. 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </LanguageProvider>
  );
}
