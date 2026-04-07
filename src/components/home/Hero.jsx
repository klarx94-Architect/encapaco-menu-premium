import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section className="relative min-h-screen pt-40 px-10 pb-20 overflow-hidden ceramic-gradient">
      {/* Background Architectural Text (Senior Layout) */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fluid-text-hero font-serif font-black text-neutral-dark/[0.03] pointer-events-none whitespace-nowrap">
        TRADICIÓN GÜÉJAR
      </h2>

      <div className="max-w-[1600px] mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 md:gap-20 items-center h-full relative z-10">
        {/* Copy Column */}
        <div className="flex flex-col items-start text-left order-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-sierra-gold mb-6 md:mb-8 px-4 py-2 border border-sierra-gold/20 rounded-full">
              Est. Sierra Nevada
            </span>
            <h1 className="text-6xl md:text-9xl font-serif font-black text-neutral-dark leading-[0.85] mb-8 md:mb-10">
              Sabor de la <br />
              <span className="italic font-normal text-terracotta-mid">Sierra</span>, alma <br />
              del <span className="text-sierra-gold underline decoration-sierra-gold/20">Mundo.</span>
            </h1>
            <p className="max-w-md text-base md:text-lg text-neutral-dark/60 font-serif italic mb-8 md:mb-12 leading-relaxed">
              "Un rincón peculiar en Güéjar Sierra donde la tapa tradicional se funde con el ritmo del Jazz y la artesanía culinaria."
            </p>
          </motion.div>
        </div>

        {/* Visual Column - Comes second in Desktop but FIRST/MIDDLE in mobile flow if we want CTA last */}
        <div className="relative pt-10 md:pt-20 order-2 lg:order-2 w-full">
          {/* Main Floating Image */}
          <motion.div 
            style={{ y: y1 }}
            className="relative z-20 w-full max-w-sm md:max-w-md mx-auto lg:ml-auto"
          >
            <div className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] shadow-[-20px_20px_40px_rgba(0,0,0,0.1)] md:shadow-[-40px_40px_80px_rgba(0,0,0,0.1)] border-[8px] md:border-[12px] border-white">
              <img 
                src="/assets/bar_tapas/img-3468.jpg" 
                alt="El Sabor de Paco" 
                className="w-full aspect-[4/5] object-cover scale-110"
              />
            </div>
          </motion.div>

          {/* Secondary Floating Image */}
          <motion.div 
            style={{ y: y2, rotate: -5 }}
            className="absolute -bottom-10 -left-10 z-30 w-full max-w-[200px] md:max-w-[280px] hidden md:block"
          >
            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-[10px] border-white ring-1 ring-black/5">
              <img 
                src="/assets/bar_tapas/tapas6-2814433.jpg" 
                alt="Tardeo en Güéjar" 
                className="w-full aspect-square object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Column - Moved to bottom on mobile */}
        <div className="order-3 w-full lg:contents">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:absolute lg:bottom-0 lg:left-0"
           >
              <a
                href="tel:+34616600772"
                className="w-full md:w-auto bg-neutral-dark text-pearl-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl text-center no-underline hover:bg-sierra-gold transition-colors"
              >
                Llamar Ahora
              </a>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                 <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-neutral-dark/30">Música hoy</span>
                 <span className="text-xs font-bold text-neutral-dark tracking-widest">Jazz & Country Classics</span>
              </div>
           </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator - Minimal Senior Style */}
      <div className="absolute bottom-10 left-10 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-20 bg-neutral-dark" />
         <span className="text-[8px] font-black uppercase tracking-[0.8em] vertical-text">Scroll</span>
      </div>
    </section>
  );
}
