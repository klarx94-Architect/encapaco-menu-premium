import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation2 } from 'lucide-react';

export default function Llegar() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 px-6 lg:px-12 min-h-screen bg-pearl-white"
    >
      <div className="max-w-[1400px] mx-auto text-center mb-16 md:mb-24">
        <span className="text-sierra-gold uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 block">Ubicación</span>
        <h1 className="text-6xl md:text-8xl font-serif font-black leading-tight text-neutral-dark mb-8">
          Encuentra el <br />
          <span className="italic font-normal text-terracotta-mid">camino.</span>
        </h1>
        <p className="text-neutral-dark/60 font-serif italic text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          "Todas las buenas historias comienzan con un viaje. Te esperamos en el corazón de Güéjar Sierra para compartir la nuestra."
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto bg-white rounded-[3rem] p-4 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-black/5">
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden bg-neutral-100 flex items-center justify-center isolate">
          {/* Map Premium Frame Overlay */}
          <div className="absolute inset-0 pointer-events-none border-8 border-white rounded-[2rem] z-10" />
          <iframe 
            src="https://maps.google.com/maps?q=En%20Que%20Paco,%20G%C3%BC%C3%A9jar%20Sierra,%20Granada&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            className="w-full h-full border-0 absolute inset-0 z-0 opacity-90 hue-rotate-15 contrast-125"
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-8 px-4 md:px-12 pb-4">
          <div className="flex items-center gap-6 self-start md:self-auto">
            <div className="w-16 h-16 rounded-full bg-sierra-gold/10 flex items-center justify-center shrink-0">
               <MapPin className="text-sierra-gold" size={28} />
            </div>
            <div className="text-left">
              <h3 className="font-serif font-black text-2xl text-neutral-dark mb-1">Güéjar Sierra</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark/40">Granada, Andalucía</p>
            </div>
          </div>
          
          <a 
            href="https://maps.google.com/maps?daddr=En+Que+Paco,+Guejar+Sierra,+Granada"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full md:w-auto flex items-center justify-center gap-4 bg-terracotta-mid text-white px-10 md:px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-dark transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            <span>Iniciar Ruta en GPS</span>
            <Navigation2 size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
