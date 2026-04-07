import React from 'react';
import { motion } from 'framer-motion';
import { Music, ArrowRight, Play, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function ServicesSection() {
  const { t } = useLanguage();
  
  const vibes = t('services.vibes');
  // Add image mapping back since translations only handle text
  const VIBE_IMAGES = [
    '/assets/bar_tapas/img-5689.jpg',
    '/assets/bar_tapas/img-5555-2814460.jpg',
    '/assets/nosotros/img-4389.jpg'
  ];

  return (
    <section className="relative py-24 bg-neutral-dark overflow-hidden">
      <div className="flex flex-col gap-10">
        {/* Architectural Background Text */}
        <div className="absolute top-6 left-10 z-0">
           <span className="text-pearl-white/5 text-[8vw] font-serif font-black leading-none uppercase">Ritmo</span>
        </div>

        <motion.div 
          className="flex gap-6 md:gap-12 px-10 md:px-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 relative z-10"
        >
          {/* Introductory Card */}
          <div className="flex-shrink-0 w-full max-w-[280px] md:w-[380px] flex flex-col justify-center">
             <span className="text-sierra-gold uppercase tracking-[0.5em] text-[9px] font-black mb-4">{t('services.tag')}</span>
             <h2 className="text-4xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
               {t('services.title')} <br /><span className="italic font-normal text-sierra-gold">{t('services.italic')}</span>
             </h2>
             <p className="text-pearl-white/40 font-serif italic text-sm md:text-base leading-relaxed">
               {t('services.description')}
             </p>
          </div>

          {/* Horizontal Gallery */}
          {vibes.map((vibe, idx) => (
            <div key={idx} className="flex-shrink-0 w-[75vw] md:w-[380px] snap-center group">
              <div className="relative h-[280px] md:h-[350px] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-[0_25px_50px_rgba(0,0,0,0.4)] mb-8 border border-white/5">
                 <img 
                   src={VIBE_IMAGES[idx]} 
                   alt={vibe.title} 
                   className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-neutral-dark/5" />
                 
                 {/* Numbering UI */}
                 <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-pearl-white/20 flex items-center justify-center text-pearl-white font-bold text-[10px] bg-neutral-dark/40 backdrop-blur-md">
                    0{idx + 1}
                 </div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3 transition-colors group-hover:text-sierra-gold">{vibe.title}</h3>
              <p className="text-pearl-white/40 text-[10px] md:text-xs leading-relaxed max-w-sm">{vibe.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
