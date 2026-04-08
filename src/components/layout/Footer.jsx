import { Instagram, Share2, MapPin, Phone, Mail, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-neutral-dark text-pearl-white pt-32 pb-16 px-10 border-t border-white/5 relative overflow-hidden">
      {/* Background Architectural Text */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.02] pointer-events-none">
         <span className="text-[25vw] font-serif font-black leading-none uppercase">PACO</span>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          
          {/* Brand Column */}
          <div className="space-y-10">
            <div className="flex flex-col gap-4">
               <img src="/assets/bar_tapas/group-4-2814581.png" alt="ENCAPACO Logo" className="h-16 w-auto object-contain" />
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-pearl-white/40">Güejar Sierra · 2026</span>
            </div>
            <p className="text-pearl-white/40 font-serif italic text-sm leading-relaxed max-w-xs">
               {t('footer.tagline')}
            </p>
            <div className="flex gap-6 items-center">
               <a href="#" className="text-pearl-white/40 hover:text-sierra-gold transition-colors"><Instagram size={20} /></a>
               <a href="#" className="text-pearl-white/40 hover:text-sierra-gold transition-colors"><Share2 size={20} /></a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-sierra-gold mb-10">{t('footer.nav_title')}</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-pearl-white/60">
              <li><Link to="/" className="hover:text-pearl-white transition-colors no-underline">{t('nav.home')}</Link></li>
              <li><Link to="/nosotros" className="hover:text-pearl-white transition-colors no-underline">{t('nav.about')}</Link></li>
              <li>
                <a 
                  href="https://open.spotify.com/user/encapaco?si=t1PY-0vMRMKJW5ISArIJ7g" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sierra-gold transition-colors no-underline flex items-center gap-2"
                >
                  {t('nav.playlist')} <Music size={14} className="text-sierra-gold" />
                </a>
              </li>
            </ul>
          </div>

          {/* Traditional Info Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-sierra-gold mb-10">{t('footer.tradition_title')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                 <MapPin size={18} className="text-sierra-gold shrink-0" />
                 <span className="text-sm font-serif italic text-pearl-white/60">Plaza Mayor, 2 <br /> Güéjar Sierra, Granada</span>
              </li>
              <li className="flex items-center gap-4">
                 <Phone size={18} className="text-sierra-gold shrink-0" />
                 <a href="tel:+34616600772" className="text-sm font-serif italic text-pearl-white/60 hover:text-sierra-gold transition-colors no-underline">+34 616 600 772</a>
              </li>
              <li className="flex items-center gap-4">
                 <Mail size={18} className="text-sierra-gold shrink-0" />
                 <a href="mailto:encapaco@gmail.com" className="text-sm font-serif italic text-pearl-white/60 hover:text-sierra-gold transition-colors no-underline">encapaco@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Legals Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-sierra-gold mb-10">{t('footer.legal_title')}</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-pearl-white/70">
              <li><Link to="/aviso-legal" className="hover:text-sierra-gold transition-colors underline decoration-white/10 underline-offset-4">{t('footer.aviso')}</Link></li>
              <li><Link to="/politica-de-privacidad" className="hover:text-sierra-gold transition-colors underline decoration-white/10 underline-offset-4">{t('footer.privacidad')}</Link></li>
              <li><Link to="/politica-de-cookies" className="hover:text-sierra-gold transition-colors underline decoration-white/10 underline-offset-4">{t('footer.cookies')}</Link></li>
              <li><Link to="/accesibilidad" className="hover:text-sierra-gold transition-colors underline decoration-white/10 underline-offset-4">{t('footer.accesibilidad')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Closing Line */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-pearl-white/20">
             {t('footer.reserved')}
           </p>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-pearl-white/40">Güejar Sierra Online</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
