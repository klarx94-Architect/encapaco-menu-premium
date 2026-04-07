import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Utensils, Globe, Music, MapPin, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  const langs = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' }
  ];

  return (
    <div className={cn("flex gap-4", className)}>
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "text-[10px] font-black tracking-[0.2em] transition-all duration-300",
            language === lang.code 
              ? "text-sierra-gold underline underline-offset-8" 
              : "text-neutral-dark/30 hover:text-neutral-dark"
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const Logo = ({ isScrolled }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <Link to="/" className="flex items-center gap-4 group no-underline">
      <img 
        src="/assets/bar_tapas/group-4-2814581.png" 
        alt="ENCAPACO Logo" 
        className="h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  </motion.div>
);

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/', icon: <Utensils size={14} /> },
    { name: t('nav.about'), href: '/nosotros', icon: <Globe size={14} /> },
    { name: t('nav.playlist'), href: '/playlist', icon: <Music size={14} />, isExternal: false },
    { name: t('nav.directions'), href: 'https://www.google.com/maps/dir/?api=1&destination=Plaza+Mayor+2+Guejar+Sierra+Granada', icon: <MapPin size={14} />, isExternal: true },
  ];

  return (
    <>
      <nav className={cn("fixed top-0 left-0 w-full z-[300] transition-all duration-500", 
        isScrolled ? "bg-white/90 backdrop-blur-xl py-4 shadow-xl border-b border-black/5" : "bg-transparent py-8")}>
        <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between">
          <Logo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-10 px-8 py-3 bg-neutral-dark/5 backdrop-blur-md rounded-full border border-black/5">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a 
                    key={link.name} 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 no-underline flex items-center gap-2 text-neutral-dark/40 hover:text-neutral-dark"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.href}
                    className={cn(
                      "text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 no-underline flex items-center gap-2",
                      location.pathname === link.href ? "text-neutral-dark" : "text-neutral-dark/40 hover:text-neutral-dark"
                    )}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                )
              ))}
            </div>
            <LanguageSwitcher className="ml-8" />
          </div>

          {/* Mobile Controls (Visible Language Switcher + Toggle) */}
          <div className="lg:hidden flex items-center gap-6">
            <div className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-black/5">
              <LanguageSwitcher className="gap-3" />
            </div>
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-neutral-dark p-2 hover:scale-110 transition-transform relative z-[510]"
            >
              {isMobileOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Curtain Menu - Moved outside of <nav> for absolute viewport stability */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[500] flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Direct Close Button in Curtain */}
            <div className="absolute top-8 right-10 z-[510]">
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="text-neutral-dark p-2 hover:scale-110 transition-transform"
              >
                <X size={32} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-10 py-24 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="w-full px-10 flex justify-center text-center"
                >
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileOpen(false)}
                      className="text-4xl md:text-6xl font-serif font-black text-sierra-gold hover:text-neutral-dark transition-colors no-underline flex flex-col items-center gap-2 text-center"
                    >
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-4xl md:text-6xl font-serif font-black text-neutral-dark hover:text-sierra-gold transition-colors no-underline block w-full text-center"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-8"
              >
                <a
                  href="tel:+34616600772"
                  className="mt-6 bg-terracotta-mid text-white px-14 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl no-underline inline-block"
                >
                  {t('nav.call')}
                </a>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-12 border-t border-black/5 flex flex-col items-center text-center gap-6 bg-white shrink-0"
            >
              <p className="font-serif italic text-neutral-dark/40 text-sm">Güejar Sierra, Granada.</p>
              <div className="flex gap-8 mt-2 opacity-30">
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center"><Phone size={16} /></div>
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center"><Globe size={16} /></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
