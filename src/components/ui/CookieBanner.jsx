import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'encapaco_cookies_consent';

// Categorías de cookies disponibles
const COOKIE_CATEGORIES = {
  necessary: {
    label: 'Necesarias',
    description: 'Imprescindibles para el funcionamiento básico del sitio (preferencia de idioma, sesión). No se pueden desactivar.',
    fixed: true,
  },
  functional: {
    label: 'Funcionales',
    description: 'Mejoran la experiencia (como recordar tu idioma entre visitas). Sin ellas, deberás seleccionarlo cada vez.',
    fixed: false,
  },
  analytics: {
    label: 'Analíticas',
    description: 'Nos permiten entender cómo se usa la carta digital para mejorarla. Actualmente no están activas en este sitio.',
    fixed: false,
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Sin consentimiento previo: mostrar banner con pequeño delay para no bloquear render
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
      // Ya hay consentimiento guardado: no mostrar nada
    } catch (_) {
      setVisible(true);
    }
  }, []);

  const saveAndClose = (prefs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        accepted: true,
        date: new Date().toISOString(),
        preferences: prefs,
      }));
    } catch (_) {}
    setVisible(false);
  };

  const handleAcceptAll = () => {
    const all = { necessary: true, functional: true, analytics: false }; // analytics inactivo
    setPreferences(all);
    saveAndClose(all);
  };

  const handleAcceptNecessary = () => {
    const min = { necessary: true, functional: false, analytics: false };
    setPreferences(min);
    saveAndClose(min);
  };

  const handleSaveCustom = () => {
    saveAndClose(preferences);
  };

  const toggleCategory = (key) => {
    if (COOKIE_CATEGORIES[key].fixed) return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', damping: 24, stiffness: 200 }}
          role="dialog"
          aria-modal="true"
          aria-label="Aviso de cookies"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[999] bg-white rounded-[2rem] shadow-2xl border border-black/5 overflow-hidden"
        >
          {/* Barra superior decorativa */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-sierra-gold/40 to-transparent" />

          <div className="p-6">
            {/* Cabecera */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sierra-gold/10 flex items-center justify-center shrink-0">
                  <Cookie size={16} className="text-sierra-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-dark/40 leading-none mb-1">ENCAPACO</p>
                  <h2 className="text-base font-serif font-black text-neutral-dark leading-tight">Uso de cookies</h2>
                </div>
              </div>
            </div>

            {/* Texto legal */}
            <p className="text-xs text-neutral-dark/60 leading-relaxed mb-4 font-serif italic">
              Usamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptarlas todas, solo las necesarias, o personalizar tu elección. Más info en nuestra{' '}
              <Link
                to="/politica-de-cookies"
                className="underline underline-offset-2 text-neutral-dark/80 hover:text-sierra-gold transition-colors"
                onClick={() => setVisible(false)}
              >
                Política de Cookies
              </Link>.
            </p>

            {/* Panel de configuración desplegable */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="space-y-3 pt-2 border-t border-black/5">
                    {Object.entries(COOKIE_CATEGORIES).map(([key, cat]) => (
                      <div key={key} className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-black uppercase tracking-widest text-neutral-dark/70 mb-0.5">{cat.label}</p>
                          <p className="text-[10px] text-neutral-dark/40 leading-relaxed font-serif">{cat.description}</p>
                        </div>
                        {/* Toggle */}
                        <button
                          onClick={() => toggleCategory(key)}
                          disabled={cat.fixed}
                          aria-checked={preferences[key]}
                          role="switch"
                          aria-label={cat.label}
                          className={`shrink-0 mt-0.5 w-10 h-5 rounded-full transition-all duration-300 relative ${
                            preferences[key] ? 'bg-sierra-gold' : 'bg-black/10'
                          } ${cat.fixed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                              preferences[key] ? 'left-5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de personalización */}
            <button
              onClick={() => setShowDetails(v => !v)}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-dark/30 hover:text-neutral-dark/60 transition-colors mb-5"
            >
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {showDetails ? 'Ocultar opciones' : 'Personalizar'}
            </button>

            {/* Botones de acción */}
            <div className="flex flex-col gap-2">
              {showDetails ? (
                <button
                  onClick={handleSaveCustom}
                  className="w-full py-3 rounded-full bg-neutral-dark text-pearl-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-colors"
                >
                  Guardar preferencias
                </button>
              ) : (
                <button
                  onClick={handleAcceptAll}
                  className="w-full py-3 rounded-full bg-neutral-dark text-pearl-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-colors"
                >
                  Aceptar todas
                </button>
              )}
              <button
                onClick={handleAcceptNecessary}
                className="w-full py-3 rounded-full border border-black/10 text-neutral-dark/50 text-[10px] font-black uppercase tracking-[0.3em] hover:border-black/30 hover:text-neutral-dark transition-colors"
              >
                Solo necesarias
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
