import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LegalLayout = ({ title, subtitle, breadcrumb, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-pearl-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-neutral-dark text-pearl-white pt-[90px] lg:pt-[120px] pb-20 px-6 lg:px-20 relative overflow-hidden">
        {/* Background Architectural Text (Subtle) */}
        <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none select-none">
           <span className="text-[20vw] font-serif font-black leading-none uppercase">LEGAL</span>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="text-[10px] uppercase tracking-[0.4em] text-pearl-white/40 hover:text-sierra-gold transition-colors no-underline">
              Inicio
            </Link>
            <span className="text-pearl-white/20">/</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-pearl-white/60">
              {breadcrumb}
            </span>
          </motion.nav>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tighter leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-lg font-serif italic text-pearl-white/60 max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </section>
    </motion.div>
  );
};

export default LegalLayout;
