import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

import { useEffect } from 'react';
// Pages
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import AdminPaco from './pages/AdminPaco';

import { LanguageProvider } from './context/LanguageContext';

function PlaylistRedirect() {
  useEffect(() => {
    window.location.href = 'https://open.spotify.com/user/encapaco?si=t1PY-0vMRMKJW5ISArIJ7g';
  }, []);
  return null;
}

function App() {

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-pearl-white min-h-screen text-neutral-dark selection:bg-terracotta-deep selection:text-white antialiased">
          {/* Scroll-triggered grain overlay (Senior detail) */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] contrast-150 grayscale mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/playlist" element={<PlaylistRedirect />} />
              <Route path="/admin-paco" element={<AdminPaco />} />
            </Routes>
          </main>

          <Footer />
          
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
