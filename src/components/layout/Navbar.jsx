import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Music, User, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { cn } from '../../lib/utils';

const Logo = ({ isScrolled }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
  >
    <Link to="/" className="flex items-center gap-4 group no-underline">
      <img 
        src="/assets/bar_tapas/group-4-2814581.png" 
        alt="ENCAPACO Logo" 
        className={cn(
          "w-auto object-contain transition-all duration-500 group-hover:scale-105",
          isScrolled ? "h-10 lg:h-14" : "h-14 lg:h-16"
        )}
      />
    </Link>
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.menu'), href: '/', icon: <User size={14} /> },
    { name: t('nav.nosotros'), href: '/nosotros', icon: <ShieldCheck size={14} /> },
    { 
      name: t('nav.playlist'),
      href: 'https://open.spotify.com/user/encapaco?si=t1PY-0vMRMKJW5ISArIJ7g',
      icon: <Music size={14} />,
      isExternal: true
    },
  ];

  return (
    <>
      <nav className={cn("fixed top-0 left-0 w-full z-[300] transition-all duration-500", 
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-black/5" 
          : "bg-transparent lg:py-8")}>
        
        <div className="max-w-[1600px] mx-auto w-full">
          
          {/* ── FILA 1 MÓVIL / FILA ÚNICA DESKTOP ── */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 lg:py-0 lg:pt-8 lg:pb-4">
            
            {/* Izquierda móvil: iconos contacto | Solo visible en móvil */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:+34616600772"
                aria-label="Llamar a ENCAPACO"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isScrolled 
                    ? "bg-white border border-black/10 shadow-sm" 
                    : "bg-white/40 backdrop-blur-md border border-white/30"
                )}
              >
                <Phone size={15} className="text-neutral-dark/60" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Plaza+Mayor+2+Guejar+Sierra+Granada"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver en Google Maps"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isScrolled 
                    ? "bg-white border border-black/10 shadow-sm" 
                    : "bg-white/40 backdrop-blur-md border border-white/30"
                )}
              >
                <MapPin size={15} className="text-neutral-dark/60" strokeWidth={1.5} />
              </a>
            </div>

            {/* Centro: Logo — ocupa todo en desktop, centrado en móvil */}
            <Logo isScrolled={isScrolled} />

            {/* Derecha desktop: menú completo */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-10 px-8 py-3 bg-neutral-dark/5 backdrop-blur-md rounded-full border border-black/5">
                {navLinks.map((link) => (
                  link.isExternal ? (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 no-underline flex items-center gap-2 text-neutral-dark/40 hover:text-neutral-dark">
                      {link.icon}<span>{link.name}</span>
                    </a>
                  ) : (
                    <Link key={link.name} to={link.href}
                      className={cn("text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 no-underline flex items-center gap-2",
                        location.pathname === link.href ? "text-neutral-dark" : "text-neutral-dark/40 hover:text-neutral-dark")}>
                      {link.icon}<span>{link.name}</span>
                    </Link>
                  )
                ))}
              </div>
              <LanguageSwitcher className="ml-8" />
            </div>

            {/* Derecha móvil: solo hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-neutral-dark p-2 hover:scale-110 transition-transform relative z-[510]"
            >
              {isMobileOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} />}
            </button>

          </div>

          {/* ── FILA 2 MÓVIL: selector de idioma centrado ── */}
          <div className={cn(
            "lg:hidden flex justify-center pb-2 transition-all duration-300",
            isMobileOpen && "opacity-0 pointer-events-none"  // ocultar cuando el menú está abierto
          )}>
            <div className={cn(
              "px-5 py-1.5 rounded-full transition-all duration-300",
              isScrolled 
                ? "bg-white/80 backdrop-blur-md border border-black/5 shadow-sm" 
                : "bg-white/30 backdrop-blur-md border border-white/20"
            )}>
              <LanguageSwitcher className="gap-4" />
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Curtain Menu - Moved outside of <nav> for absolute viewport stability */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[400] bg-white pt-[140px] px-10"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-4xl font-serif font-black text-neutral-dark no-underline flex items-center gap-4"
                    >
                      <span className="text-sierra-gold/30 text-base font-sans">0{idx + 1}</span>
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={cn(
                        "text-4xl font-serif font-black no-underline flex items-center gap-4",
                        location.pathname === link.href ? "text-sierra-gold" : "text-neutral-dark"
                      )}
                    >
                      <span className="text-sierra-gold/30 text-base font-sans">0{idx + 1}</span>
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-12 border-t border-black/5 space-y-6"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-dark/30 mb-8">{t('footer.contact_title')}</p>
                <div className="space-y-4">
                  <a href="tel:+34616600772" className="flex items-center gap-4 text-neutral-dark/60 no-underline font-serif italic text-xl">
                    <Phone size={18} className="text-sierra-gold" />
                    +34 616 600 772
                  </a>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-neutral-dark/60 no-underline font-serif italic text-xl">
                    <MapPin size={18} className="text-sierra-gold" />
                    Plaza Mayor, 2. Güéjar Sierra
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
