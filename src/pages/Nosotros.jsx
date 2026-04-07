import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServicesSection from '../components/home/ServicesSection';
import { MapPin, Phone, Music, Camera, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GALLERY_IMAGES = [
  { src: '/assets/bar_tapas/img-5555-2814460.jpg', alt: 'Sierra Nevada' },
  { src: '/assets/paco/unnamed.jpg', alt: 'Tradición Local' },
  { src: '/assets/bar_tapas/img-4315.jpg', alt: 'Fachada Encapaco' },
  { src: '/assets/bar_tapas/img-3468.jpg', alt: 'Herencia Alpujarreña' },
  { src: '/assets/nosotros/img-20211112-142457-original.jpg', alt: 'Rincón con Alma' },
  { src: '/assets/bar_tapas/img-5689.jpg', alt: 'Detalles' },
];

export default function Nosotros() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const rotate = useTransform(scrollY, [0, 500], [0, 3]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-pearl-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-10 overflow-hidden ceramic-gradient">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-sierra-gold mb-6 px-4 py-2 border border-sierra-gold/20 rounded-full">
               {t('nosotros.tag')}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-neutral-dark leading-[0.9] mb-8 tracking-tighter">
              {t('nosotros.title')}
            </h1>
            <p className="max-w-sm text-base md:text-lg text-neutral-dark/60 font-serif italic mb-10 leading-relaxed">
              {t('nosotros.subtitle')}
            </p>
          </motion.div>

          <div className="relative pt-6">
            <motion.div style={{ y: y1, rotate }} className="relative z-20 w-full max-w-xs mx-auto">
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-[-30px_30px_60px_rgba(0,0,0,0.1)] border-[10px] border-white">
                <img src="/assets/nosotros/img-5549.jpg" alt="Paco Heritage" className="w-full aspect-[4/5] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Atmospheric Gallery */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-10 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-sierra-gold uppercase tracking-[0.5em] text-[10px] font-black mb-3 block">{t('nosotros.moments')}</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-neutral-dark">{t('nosotros.refuge')}</h2>
          </div>
          <div className="pb-1">
             <span className="text-neutral-dark/10 text-[9px] font-black uppercase tracking-widest animate-pulse">Desliza para explorar →</span>
          </div>
        </div>

        <div className="flex gap-8 px-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="flex-shrink-0 w-[70vw] md:w-[320px] rounded-[2rem] overflow-hidden shadow-lg snap-center group border border-black/5"
            >
               <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                     <span className="text-white text-[9px] font-black uppercase tracking-[0.3em] block">{img.alt}</span>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 px-10 relative bg-pearl-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-serif font-black leading-[0.95] text-neutral-dark tracking-tighter">
                {t('nosotros.tradition')}
              </h2>
              <div className="space-y-4">
                 <p className="text-base md:text-lg font-serif italic text-neutral-dark/70 leading-relaxed">
                   {t('nosotros.description')}
                 </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                 <div className="flex items-start gap-4">
                    <MapPin className="text-sierra-gold" size={20} />
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-dark/20 block mb-1">{t('footer.tradition_title')}</span>
                       <p className="font-serif font-bold text-base leading-tight">{t('nosotros.address')}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <Music className="text-sierra-gold" size={20} />
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-dark/20 block mb-1">{t('nosotros.atmosphere')}</span>
                       <p className="font-serif font-bold text-base leading-tight">Jazz & Soul <br /> Classics.</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="relative rounded-[2rem] overflow-hidden shadow-xl h-[350px] md:h-[450px] order-1 lg:order-2 border-[8px] border-white">
              <img src="/assets/bar_tapas/img-4315.jpg" alt="Interior Paco" className="w-full h-full object-cover" />
           </div>
        </div>
      </section>

      <ServicesSection />

      {/* Spotify / Music Section */}
      <section className="py-24 px-10 bg-pearl-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="mb-12"
           >
              <div className="w-20 h-20 bg-sierra-gold/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                 <Music className="text-sierra-gold" size={32} />
              </div>
              <span className="text-sierra-gold uppercase tracking-[0.5em] text-[10px] font-black mb-4 block">{t('nosotros.rhythm')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-neutral-dark mb-8 leading-tight">
                {t('nosotros.sounds')}
              </h2>
              <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-dark/60 font-serif italic mb-12 leading-relaxed">
                {t('nosotros.paco_soul')}
              </p>
           </motion.div>

           <Link 
             to="/playlist"
             className="group relative inline-flex items-center gap-6 bg-[#1DB954] text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#1ed760] transition-all shadow-[0_20px_50px_rgba(29,185,84,0.3)] no-underline overflow-hidden"
           >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-4">
                 {t('nosotros.explore')}
                 <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Music size={12} className="text-[#1DB954]" />
                 </div>
              </span>
           </Link>
        </div>

        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sierra-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-terracotta-mid/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Final Visit Us Section */}
      <section id="contacto" className="py-24 px-10 bg-white scroll-mt-32 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <div className="flex flex-col items-center gap-4">
              <MapPin size={32} className="text-sierra-gold" />
              <h2 className="text-3xl md:text-5xl font-serif font-black text-neutral-dark uppercase tracking-tighter">
                {t('nosotros.visit')}
              </h2>
           </div>
           
           <div className="space-y-4">
              <p className="text-xl font-serif italic text-neutral-dark/60">{t('nosotros.address')}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-dark/20 italic">{t('nosotros.footer_quote')}</p>
           </div>

           <div className="pt-8">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Plaza+Mayor+2+Guejar+Sierra+Granada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-6 bg-neutral-dark text-pearl-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-sierra-gold transition-all shadow-2xl no-underline"
              >
                {t('nosotros.open_maps')}
                 <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe size={12} className="text-white" />
                 </div>
              </a>
           </div>
        </div>
      </section>

      {/* Experience Closing */}
      <section className="relative py-40 px-10 overflow-hidden flex items-center justify-center bg-neutral-dark text-center">
         <div className="absolute inset-0 z-0">
            <img src="/assets/bar_tapas/img-5555-2814460.jpg" alt="Sierra" className="w-full h-full object-cover opacity-10 grayscale" />
         </div>

         <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
               <span className="text-sierra-gold uppercase tracking-[0.5em] text-[9px] font-black mb-8 block opacity-50">Puro Heritage</span>
               <h2 className="text-4xl md:text-6xl font-serif font-black mb-12 leading-[1] uppercase tracking-tighter text-white">
                 {t('nosotros.bites')}
               </h2>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <a 
                    href="tel:+34616600772"
                    className="bg-white text-neutral-dark px-10 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[9px] hover:bg-sierra-gold hover:text-white transition-all shadow-xl no-underline"
                  >
                    {t('nav.call')}
                  </a>
               </div>
            </motion.div>
         </div>
      </section>
    </motion.div>
  );
}
