import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Phone, Utensils, MapPin, Navigation, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import CategoryCarousel from '../ui/CategoryCarousel';

const MENU_DATA = {
  'Bocadillos': {
    image: '/assets/menu_new/bocadillos-2.jpg',
    items: [
      { name: 'Alcachofas con anchoas', price: '5,50€' },
      { name: 'Queso curado al horno', price: '5,50€', desc: 'Con tomate, orégano y pimentón dulce' },
      { name: 'Carne en salsa', price: '5,00€', desc: 'Receta de la abuela' },
      { name: 'Pollo completo', price: '6,00€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Lomo completo', price: '6,00€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Atún', price: '5,00€', desc: 'Con tomate y lechuga' },
      { name: 'Queso curado', price: '5,00€' },
      { name: 'Salchichón', price: '4,50€', desc: 'Ibéricos' },
      { name: 'Chorizo',    price: '4,50€', desc: 'Ibéricos' },
      { name: 'Morcilla', price: '4,50€' },
      { name: 'Longaniza', price: '4,50€' },
      { name: 'Tortilla con jamón y mayonesa', price: '5,00€' },
      { name: 'Tortilla de patatas', price: '4,50€' },
      { name: 'Jamón', price: '4,50€' },
      { name: 'Carne Mechada', price: '5,00€' },
    ]
  },
  'Hamburguesas': {
    image: '/assets/bar_tapas/hamburgesas2-2814416.jpg', // CORRECTED IMAGE
    items: [
      { name: 'Cerdo completa', price: '6,00€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Ternera completa', price: '8,00€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Pollo completa', price: '7,00€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Hamburguesa de brócoli', price: '6,00€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Extra Bacon', price: '+1,00€' },
    ]
  },
  'Pizzas': {
    image: '/assets/menu_new/pizzas.jpg',
    items: [
      { name: 'Margarita', price: '10,00€', desc: 'Tomate, mozzarella y orégano' },
      { name: 'Jamón y queso', price: '11,00€', desc: 'Tomate, mozzarella, jamón cocido y orégano' },
      { name: '5 quesos', price: '11,00€', desc: 'Masa fina, tomate, mozzarella, Gouda, emmental, semicurado, queso azul y orégano' },
      { name: 'Verduras y queso de cabra', price: '13,00€', desc: 'Espinacas, queso de cabra, cherry y orégano' },
      { name: 'Barbacoa', price: '13,00€', desc: 'Salsa barbacoa, carne, bacon, cebolla y orégano' },
      { name: '4 estaciones', price: '13,00€', desc: 'Jamón cocido, atún, champiñones, cebolla, alcachofa, aceitunas y orégano' },
    ]
  },
  'Sandwiches': {
    image: '/assets/menu_new/sandwiches2.jpg',
    items: [
      { name: 'Mixto', price: '3,50€', desc: 'Jamón York y queso' },
      { name: 'Normal', price: '4,50€', desc: 'Tomate y lechuga' },
      { name: 'Completo', price: '5,00€', desc: 'Tomate, lechuga, cebolla y huevo' },
      { name: 'Pollo completo', price: '5,50€', desc: 'Tomate, lechuga, queso, cebolla y huevo' },
      { name: 'Vegetal', price: '5,50€' },
      { name: 'Tortilla con jamón y mayonesa', price: '5,00€' },
    ]
  },
  'Raciones': {
    image: '/assets/menu_new/raciones.jpg',
    items: [
      { name: 'Carne en salsa', price: 'Consultar' },
      { name: 'Enchilada', price: 'Consultar' },
      { name: 'Pincho Moruno', price: 'Consultar' },
      { name: 'Pincho Pollo', price: 'Consultar' },
    ]
  }
};

const TE_DATA = [
  { name: 'Té negro con canela', price: '1,80€' },
  { name: 'Té negro pakistaní', price: '1,80€' },
  { name: 'Té verde china Gunpowder', price: '1,80€' },
  { name: 'Té verde con mango', price: '1,80€' },
  { name: 'Té rojo Pu Erh', price: '1,80€' },
  { name: 'Té rojo con naranja y limón', price: '1,80€' },
  { name: 'Té blanco con fresa/frambuesa', price: '1,80€' },
  { name: 'Manzanilla', price: '1,50€' },
  { name: 'Tila', price: '1,50€' },
  { name: 'Poleo menta', price: '1,50€' },
  { name: 'Té de sobre (Negro/Rojo/Verde)', price: '1,50€' },
  { name: 'Rooibos floral', price: '1,80€' },
  { name: 'Rooibos frambuesa', price: '1,80€' },
  { name: 'Rooibos frutas del bosque', price: '1,80€' },
  { name: 'Limón y jengibre', price: '1,80€' },
];

export default function DigitalMenu() {
  const { t, language } = useLanguage();
  const [isTeOpen, setIsTeOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMenu() {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('API unstable');
        const data = await res.json();
        if (data && data.categories) {
          const normalized = {};
          data.categories.forEach(cat => {
            if (cat.visible !== false) {
              normalized[cat.name_es] = {
                image: cat.cover_image || MENU_DATA[cat.name_es]?.image || '/assets/menu_new/pizzas.jpg',
                images: cat.cover_images || [cat.cover_image || MENU_DATA[cat.name_es]?.image || '/assets/menu_new/pizzas.jpg'],
                items: cat.items.filter(i => i.visible !== false),
                isDynamic: true,
                names: { es: cat.name_es, en: cat.name_en, fr: cat.name_fr }
              };
            }
          });
          setActiveMenu(normalized);
        }
      } catch (err) {
        console.warn('Falling back to local MENU_DATA:', err);
        setActiveMenu(null);
      } finally {
        setLoading(false);
      }
    }
    getMenu();
  }, []);

  const displayData = activeMenu || MENU_DATA;

  return (
    <section className="py-20 px-6 lg:px-20 bg-pearl-white min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Artisanal Logo & Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative mb-12 flex justify-center"
          >
             {/* Simple Floating Wrapper */}
             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 w-full flex justify-center"
             >
                <div className="relative inline-block group max-w-full px-4">
                   {/* Clean Glow */}
                   <div className="absolute -inset-8 bg-sierra-gold/10 rounded-[3rem] blur-3xl opacity-50" />
                   
                   {/* The Logo Container - Senior Premium Edition (Final) */}
                   <div className="relative w-[300px] h-[230px] md:w-[550px] md:h-[380px] rounded-[2.5rem] md:rounded-[4rem] border-[12px] border-white shadow-[0_60px_130px_-30px_rgba(0,0,0,0.5)] overflow-hidden bg-white/95 backdrop-blur-sm transition-all duration-700 hover:shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)]">
                      {/* Inner Frame for depth */}
                      <div className="absolute inset-0 border-[1px] border-black/5 rounded-[2.5rem] md:rounded-[4rem] pointer-events-none" />
                      
                      {/* Premium Image Render - Centered with safe margins */}
                      <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
                         <img 
                           src="/assets/branding/artisanal-logo.webp" 
                           alt="Encapaco Artisanal Logo" 
                           className="w-full h-full object-contain"
                         />
                      </div>
                      
                      {/* Premium Glass & Light Effects */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 pointer-events-none" />
                      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.03)] pointer-events-none" />
                   </div>
                </div>
             </motion.div>
          </motion.div>

          <span className="text-sierra-gold uppercase tracking-[0.6em] text-[9px] md:text-[10px] font-black mb-6 block">{t('hero.tag')}</span>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-black text-neutral-dark mb-10 tracking-tight leading-tight whitespace-nowrap">
            {t('hero.title')} <span className="italic font-normal text-terracotta-mid">{t('hero.italic')}</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="tel:+34616600772"
              className="bg-neutral-dark text-white px-10 py-5 rounded-full flex items-center gap-4 hover:bg-sierra-gold transition-all duration-500 shadow-xl no-underline"
            >
              <Phone size={18} className="text-sierra-gold" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">{t('nav.call')}</span>
            </a>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-32 md:space-y-40">
          {Object.entries(displayData).map(([category, data], idx) => {
            if (category === 'tes') return null;
            const categoryTitle = data.isDynamic ? data.names[language] : t(`menu.categories.${category}`);
            
            return (
              <div key={category} className="relative group/cat">
                <div className="flex flex-col md:flex-row bg-neutral-dark rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] min-h-[300px] md:h-[350px] lg:h-[400px] border border-white/5">
                  <div className="w-full md:w-[45%] p-10 md:p-12 lg:p-16 flex flex-col justify-center relative z-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="text-sierra-gold uppercase tracking-[0.5em] text-[10px] font-black mb-4 block">{t('menu.category')}</span>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[0.95] mb-8 tracking-tighter">
                        {categoryTitle}
                      </h3>
                      <div className="w-16 h-1.5 bg-terracotta-mid group-hover/cat:w-32 transition-all duration-1000 ease-out shadow-lg" />
                    </motion.div>
                  </div>
                  <div className="w-full md:w-[55%] h-[250px] md:h-full relative overflow-hidden z-10 transition-transform duration-[2s] group-hover/cat:scale-110">
                    <CategoryCarousel 
                      images={data.images || [data.image]} 
                      categoryName={category} 
                    />
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-dark to-transparent hidden md:block z-20" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 lg:gap-x-20 lg:gap-y-12 px-6 mt-12">
                  {data.items.map((item, i) => {
                    const itemName = data.isDynamic ? item[`name_${language}`] : t(`menu.items.${item.name}`);
                    const itemDesc = data.isDynamic ? item[`description_${language}`] : (item.desc ? t(`menu.items.${item.desc}`) : null);
                    
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex justify-between items-start gap-6 group border-b border-black/[0.03] pb-5"
                      >
                        <div className="space-y-2 flex-1">
                          <h4 className="text-xl md:text-2xl font-bold text-neutral-dark group-hover:text-terracotta-mid transition-colors tracking-tight leading-tight">
                            {itemName}
                          </h4>
                          {itemDesc && (
                            <p className="text-base md:text-lg font-serif italic text-neutral-dark/90 leading-relaxed font-medium">
                              {itemDesc}
                            </p>
                          )}
                        </div>
                        <span className="text-lg md:text-xl font-black text-sierra-gold shrink-0 bg-sierra-gold/5 px-5 py-1.5 rounded-full border border-sierra-gold/10">
                          {item.price === 'Consultar' ? t('menu.items.Consultar') : item.price}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

           <div className="pt-20">
              <motion.button 
                onClick={() => setIsTeOpen(!isTeOpen)}
                animate={{ 
                  scale: isTeOpen ? 1 : [1, 1.02, 1],
                  backgroundColor: isTeOpen ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,1)"
                }}
                transition={{ 
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  backgroundColor: { duration: 0.3 }
                }}
                className="w-full flex items-center justify-between p-8 md:p-12 rounded-[2.5rem] border-2 border-sierra-gold/20 hover:border-sierra-gold/50 transition-all group shadow-xl bg-white relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-sierra-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="flex items-center gap-6 md:gap-10 relative z-10">
                    <div className="w-16 h-16 bg-sierra-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-sierra-gold/20 transition-colors">
                       <Utensils size={32} className="text-sierra-gold" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-serif font-black text-neutral-dark uppercase tracking-tighter">{t('menu.teas')}</h3>
                 </div>
                 <motion.div 
                   animate={{ rotate: isTeOpen ? 180 : 0 }}
                   className="text-sierra-gold group-hover:scale-125 transition-transform p-4 bg-sierra-gold/5 rounded-full"
                 >
                   <ChevronDown size={40} />
                 </motion.div>
              </motion.button>
  
              <AnimatePresence>
                {isTeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid md:grid-cols-3 gap-6 py-12">
                       {(displayData['Tés e Infusiones']?.items || displayData['tes']?.items || TE_DATA).map((item, i) => {
                         const itemName = item[`name_${language}`] || t(`menu.teas_list.${item.name}`);
                         return (
                           <div key={i} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-black/5 shadow-sm hover:border-sierra-gold/30 transition-all">
                              <span className="text-sm font-bold text-neutral-dark">{itemName}</span>
                              <span className="text-sm font-black text-sierra-gold">{item.price}</span>
                           </div>
                         );
                       })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* Playlist CTA Section - Premium Integration */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-24 p-12 md:p-20 rounded-[3rem] bg-neutral-dark text-pearl-white relative overflow-hidden group shadow-2xl"
           >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sierra-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sierra-gold/10 transition-all duration-1000" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta-mid/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                 <div className="text-center lg:text-left space-y-6">
                    <div className="flex items-center gap-4 justify-center lg:justify-start mb-2">
                       <div className="w-10 h-10 bg-sierra-gold/20 rounded-xl flex items-center justify-center">
                          <Music className="text-sierra-gold" size={20} />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-sierra-gold">
                          {t('menu.playlist_cta.tag')}
                       </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight">
                       {t('menu.playlist_cta.title')}
                    </h2>
                    <p className="text-pearl-white/60 font-serif italic text-lg max-w-xl leading-relaxed">
                       {t('menu.playlist_cta.desc')}
                    </p>
                 </div>
                 
                 <a 
                   href="https://open.spotify.com/user/encapaco?si=t1PY-0vMRMKJW5ISArIJ7g"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group/btn relative inline-flex items-center gap-6 px-12 py-6 bg-sierra-gold rounded-full text-neutral-dark font-black uppercase tracking-[0.3em] text-[10px] no-underline hover:bg-white transition-all duration-500 shadow-xl overflow-hidden"
                 >
                    <span className="relative z-10">{t('menu.playlist_cta.button')}</span>
                    <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                 </a>
              </div>
           </motion.div>
        </div>

        {/* How to Get There (Llegar) Section */}
        <div className="mt-48 pt-32 border-t border-black/5">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                 <span className="text-sierra-gold uppercase tracking-[0.5em] text-[10px] font-black mb-6 block">{t('directions.tag')}</span>
                 <h2 className="text-5xl md:text-6xl font-serif font-black text-neutral-dark mb-10 leading-tight">
                   {t('directions.title')} <br /> <span className="italic font-normal text-terracotta-mid text-6xl md:text-7xl">{t('directions.italic')}</span> {t('directions.end')}
                 </h2>
                 <div className="space-y-8 mb-12">
                    <div className="flex items-start gap-4">
                       <MapPin className="text-terracotta-mid shrink-0" size={24} />
                       <p className="text-lg font-serif italic text-neutral-dark/70 leading-relaxed">
                         {t('directions.subtitle')}
                       </p>
                    </div>
                 </div>
                 <a 
                   href="https://www.google.com/maps/dir/?api=1&destination=Plaza+Mayor+2+Guejar+Sierra+Granada"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-4 bg-terracotta-mid text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-dark transition-all shadow-2xl no-underline group"
                 >
                    <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {t('directions.button')}
                 </a>
              </div>

              <div className="relative group">
                 <div className="absolute -inset-4 bg-sierra-gold/10 rounded-[3rem] blur-2xl group-hover:bg-sierra-gold/20 transition-all duration-1000" />
                 <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                    <img 
                      src="/assets/bar_tapas/img-5555-2814460.jpg" 
                      alt="Mapa Localización" 
                      className="w-full h-full object-cover transition-all duration-1000"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                          <MapPin size={32} className="text-terracotta-mid" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Final Footer Spacer */}
        <div className="mt-40 text-center opacity-20">
           <div className="w-[1px] h-20 bg-neutral-dark mx-auto mb-8" />
           <p className="text-[10px] font-black uppercase tracking-[1em]">Encapaco Tradición</p>
        </div>

      </div>


    </section>
  );
}
