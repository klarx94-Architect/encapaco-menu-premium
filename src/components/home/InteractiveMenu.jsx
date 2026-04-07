import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const DISHES = [
  { 
    id: 1, 
    cat: 'Tapas Clásicas', 
    name: 'Nachos Caseros', 
    price: '4.50', 
    desc: 'Crujientes totopos de maíz con chili de carne, pico de gallo y auténtico queso fundido.', 
    img: '/assets/comida/img-0010-original.jpg' 
  },
  { 
    id: 2, 
    cat: 'Especialidades', 
    name: 'The Country Gold', 
    price: '12.50', 
    desc: 'Hamburguesa de vaca madurada en pan rústico con reducción de Oporto.', 
    img: '/assets/bar_tapas/hamburgesas2-2814416.jpg' 
  },
  { 
    id: 3, 
    cat: 'Para Compartir', 
    name: 'Surtido de la Sierra', 
    price: '16.00', 
    desc: 'Selección premium de chacinas de Güéjar, quesos curados y olivas.', 
    img: '/assets/bar_tapas/raciones-2814421.jpg' 
  },
  { 
    id: 4, 
    cat: 'Artesanales', 
    name: 'Pizza del Chef', 
    price: '13.50', 
    desc: 'Masa madre de fermentación lenta, tomate San Marzano y albahaca fresca.', 
    img: '/assets/comida/pizzas.jpg' 
  }
];

export default function InteractiveMenu({ onReserve }) {
  return (
    <section id="menu" className="py-20 md:py-32 px-6 lg:px-12 bg-pearl-white">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Context & Copy */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 relative z-10">
           <span className="text-sierra-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-black mb-6 md:mb-8 block">Curaduría Gastronómica</span>
           <h2 className="text-5xl md:text-7xl font-serif font-black text-neutral-dark mb-8 leading-[0.9]">
             Nuestra <br className="hidden md:block" />
             <span className="italic font-normal text-terracotta-mid underline decoration-terracotta-mid/20">Colección.</span>
           </h2>
           <p className="text-neutral-dark/60 font-serif italic text-base md:text-lg max-w-sm leading-relaxed mb-12">
             "Cada bocado es una nota musical. Hemos diseñado una carta breve pero contundente, enfocada en la calidad y el sabor real de la sierra."
           </p>
           
           {/* CTA Buttons in Left Column for Desktop */}
           <div className="hidden lg:flex flex-col gap-4">
              <Link to="/menu" className="group flex items-center justify-between bg-neutral-dark text-white px-8 py-5 rounded-full hover:bg-terracotta-mid transition-all duration-500 shadow-xl">
                 <span className="text-[10px] uppercase tracking-widest font-bold">Ver Carta Completa</span>
                 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button onClick={onReserve} className="group flex items-center justify-between bg-transparent border border-black/10 text-neutral-dark px-8 py-5 rounded-full hover:border-sierra-gold hover:text-sierra-gold transition-all duration-300">
                 <span className="text-[10px] uppercase tracking-widest font-bold">Reservar Mesa</span>
                 <Calendar size={18} />
              </button>
           </div>
        </div>

        {/* Right Side: Responsive Menu Collection */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          {DISHES.map((dish, i) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col sm:flex-row items-start sm:items-center p-5 md:p-6 bg-white rounded-[2rem] border border-black/5 shadow-sm hover:shadow-2xl hover:border-sierra-gold/30 transition-all duration-500 gap-6"
            >
               {/* Permanent Image Thumbnail */}
               <div className="w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                 <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
               
               {/* Description */}
               <div className="flex-1 w-full">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-sierra-gold mb-2 block">{dish.cat}</span>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3">
                     <h3 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark leading-tight">{dish.name}</h3>
                     <span className="text-xl md:text-2xl font-serif italic text-sierra-gold font-bold shrink-0">{dish.price}€</span>
                  </div>
                  <p className="text-base font-serif italic text-black leading-relaxed line-clamp-3 md:line-clamp-none">
                    {dish.desc}
                  </p>
               </div>
            </motion.div>
          ))}

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col gap-4 mt-8 lg:hidden">
             <Link to="/menu" className="flex items-center justify-center gap-4 bg-neutral-dark text-white px-8 py-5 rounded-[2rem] shadow-xl active:scale-95 transition-transform">
                <span className="text-[10px] uppercase tracking-widest font-bold">Ver Carta Completa</span>
                <ArrowRight size={16} />
             </Link>
             <button onClick={onReserve} className="flex items-center justify-center gap-4 bg-white border border-black/10 text-neutral-dark px-8 py-5 rounded-[2rem] active:scale-95 transition-transform">
                <span className="text-[10px] uppercase tracking-widest font-bold">Reservar Mesa</span>
                <Calendar size={16} />
             </button>
          </div>
        </div>

      </div>
    </section>
  );
}
