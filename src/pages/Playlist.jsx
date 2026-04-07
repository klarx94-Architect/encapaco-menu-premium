import React from 'react';
import { motion } from 'framer-motion';
import { Music, ArrowRight, Play, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const PLAYLISTS = [
  { name: 'PACO SELECTION: JAZZ & SOUL', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdfe979D9atZ' },
  { name: 'GÜÉJAR MORNINGS', url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM3M' },
  { name: 'ENCAPACO NIGHTS', url: 'https://open.spotify.com/playlist/37i9dQZF1DX2sQHbt0Zv0S' },
  { name: 'TRADICIÓN & RITMO', url: 'https://open.spotify.com/playlist/37i9dQZF1DX5Ejj0EkURtP' },
  { name: 'SIERRA NEVADA VIBES', url: 'https://open.spotify.com/playlist/37i9dQZF1DX82Zzp6Mjs6T' },
  { name: 'CLASSIC COUNTRY PACO', url: 'https://open.spotify.com/playlist/37i9dQZF1DX0S06vvuYv9u' }
];

const MusicNotes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{ 
            y: "-10vh",
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          className="absolute text-white/40"
        >
          <Music size={24 + Math.random() * 20} />
        </motion.div>
      ))}
    </div>
  );
};

export default function Playlist() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Navbar Visibility Guard */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-50 pointer-events-none" />
      
      <MusicNotes />

      <div className="relative z-10 pt-40 pb-20 px-10 max-w-6xl mx-auto">
        <header className="mb-20 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <div className="w-16 h-16 bg-[#1DB954]/20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(29,185,84,0.3)]">
                 <Music className="text-[#1DB954]" size={32} />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 uppercase tracking-tighter">
                {t('playlist.title')} <br /> <span className="text-[#1DB954]">ENCAPACO.</span>
              </h1>
              <p className="max-w-xl mx-auto text-white/60 font-serif italic text-lg leading-relaxed">
                {t('playlist.subtitle')}
              </p>
           </motion.div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-10 mb-40 relative z-10">
          {PLAYLISTS.map((pl, i) => (
            <motion.a
              key={i}
              href={pl.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl group transition-all relative overflow-hidden shadow-2xl hover:border-[#1DB954]/50"
            >
               <div className="absolute top-6 right-6 text-[#1DB954] opacity-20 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} />
               </div>
               
               <div className="w-full aspect-square bg-gradient-to-br from-white/10 to-transparent rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden ring-1 ring-white/10">
                  <Music className="text-white/5 group-hover:text-[#1DB954]/20 transition-colors" size={80} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="w-20 h-20 bg-[#1DB954] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(29,185,84,0.6)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Play fill="white" size={32} className="ml-1" />
                     </div>
                  </div>
               </div>

               <h3 className="text-base md:text-lg font-black text-white/90 leading-tight tracking-tight uppercase group-hover:text-[#1DB954] transition-colors line-clamp-2">
                 {pl.name}
               </h3>
               <p className="text-[10px] uppercase tracking-[0.4em] text-[#1DB954]/60 group-hover:text-[#1DB954] mt-3 font-black transition-colors">{t('playlist.official')}</p>
            </motion.a>
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="relative pt-32 pb-12 border-t border-white/5">
           <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative z-10">
              <Link 
                to="/" 
                className="group relative px-14 py-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl transition-all duration-500 hover:bg-white/10 hover:border-white/30 no-underline"
              >
                 <div className="flex items-center gap-6 relative z-10">
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">{t('playlist.cta_menu')}</span>
                    <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
                 </div>
              </Link>

              <Link 
                to="/nosotros" 
                className="group relative px-14 py-8 rounded-full bg-sierra-gold text-neutral-dark transition-all duration-500 hover:scale-105 shadow-2xl no-underline"
              >
                 <div className="flex items-center gap-6 relative z-10">
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">{t('playlist.cta_visit')}</span>
                    <MapPin size={20} className="text-neutral-dark group-hover:scale-110 transition-transform" />
                 </div>
              </Link>
           </div>

           <div className="mt-20 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">"Sierra Nevada · Güéjar Sierra"</p>
           </div>
        </div>
      </div>
    </div>
  );
}
