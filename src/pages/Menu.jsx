import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, Calendar, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const MENU_ITEMS = [
  // Hamburguesas
  { id: 1, cat: 'Hamburguesas', name: 'Vaca Madurada', price: 12.50, desc: 'Carne madurada, queso cheddar fundido, cebolla crujiente y bacon.' },
  { id: 2, cat: 'Hamburguesas', name: 'Pollo Crujiente', price: 10.50, desc: 'Pechuga crujiente, lechuga, tomate y salsa especial.' },
  
  // Bocadillos
  { id: 3, cat: 'Bocadillos', name: 'Especial ENCAPACO', price: 4.50, desc: 'Lomo, pepito, bacon, queso, mahonesa y tomate.' },
  { id: 4, cat: 'Bocadillos', name: 'Lomo, queso y pimientos', price: 4.00, desc: '' },
  { id: 5, cat: 'Bocadillos', name: 'Pechuga de pollo', price: 4.50, desc: 'Lechuga, tomate y ajonesa.' },
  { id: 6, cat: 'Bocadillos', name: 'Lomo y jamón curado', price: 4.50, desc: 'Tomate, aceite y alioli.' },
  { id: 7, cat: 'Bocadillos', name: 'Bacon y queso', price: 4.00, desc: '' },
  { id: 8, cat: 'Bocadillos', name: 'Tortilla francesa', price: 4.50, desc: 'A elegir: jamón, queso, atún.' },
  { id: 9, cat: 'Bocadillos', name: 'Atún y pimientos', price: 4.00, desc: '' },
  { id: 10, cat: 'Bocadillos', name: 'Lomo curado y tomate', price: 4.00, desc: '' },

  // Sandwiches
  { id: 11, cat: 'Sandwiches', name: 'Mixto', price: 3.00, desc: 'Jamón york y queso.' },
  { id: 12, cat: 'Sandwiches', name: 'Vegetal', price: 4.50, desc: 'Lechuga, tomate, huevo, espárragos, atún, mahonesa.' },
  { id: 13, cat: 'Sandwiches', name: 'Pollo', price: 4.50, desc: 'Pechuga, lechuga, tomate, huevo y mahonesa.' },
  { id: 14, cat: 'Sandwiches', name: 'Atún', price: 3.50, desc: 'Atún, pimientos y lechuga.' },

  // Pizzas
  { id: 15, cat: 'Pizzas', name: 'Margarita', price: 7.00, desc: 'Tomate, mozzarella y orégano.' },
  { id: 16, cat: 'Pizzas', name: 'Jamón York', price: 8.00, desc: 'Tomate, mozzarella, jamón york y orégano.' },
  { id: 17, cat: 'Pizzas', name: 'Bacon', price: 8.00, desc: 'Tomate, mozzarella, bacon y orégano.' },
  { id: 18, cat: 'Pizzas', name: '4 Quesos', price: 9.00, desc: 'Tomate, mozzarella, emmental, gouda, roquefort.' },
  { id: 19, cat: 'Pizzas', name: 'Barbacoa', price: 9.00, desc: 'Carne picada, salsa barbacoa y orégano.' },
  { id: 20, cat: 'Pizzas', name: 'Carbonara', price: 9.50, desc: 'Nata, bacon, champiñones, cebolla.' },
  { id: 21, cat: 'Pizzas', name: 'ENCAPACO', price: 10.00, desc: 'Jamón york, bacon, roquefort, atún, pimiento, champiñón.' },

  // Raciones
  { id: 22, cat: 'Raciones', name: 'Carne en salsa', price: 8.50, desc: 'Nuestra receta tradicional a fuego lento.' },
  { id: 23, cat: 'Raciones', name: 'Papas bravas', price: 6.00, desc: 'Con salsa picante casera.' },
  { id: 24, cat: 'Raciones', name: 'Rosca serrana', price: 12.00, desc: 'Embutidos ibéricos y aceite de oliva.' },
  { id: 25, cat: 'Raciones', name: 'Pincho moruno', price: 7.50, desc: 'Marinado andaluz a la brasa.' },

  // Bebidas
  { id: 26, cat: 'Bebidas Calientes', name: 'Té negro con canela', price: 1.80, desc: 'Té negro' },
  { id: 27, cat: 'Bebidas Calientes', name: 'Té negro pakistaní', price: 1.80, desc: 'Té negro' },
  { id: 28, cat: 'Bebidas Calientes', name: 'Té verde china Gunpowder', price: 1.80, desc: 'Té verde' },
  { id: 29, cat: 'Bebidas Calientes', name: 'Té verde con mango', price: 1.80, desc: 'Té verde' },
  { id: 30, cat: 'Bebidas Calientes', name: 'Té rojo Pu Erh', price: 1.80, desc: 'Té rojo' },
  { id: 31, cat: 'Bebidas Calientes', name: 'Té rojo con naranja y limón', price: 1.80, desc: 'Té rojo' },
  { id: 32, cat: 'Bebidas Calientes', name: 'Té blanco con fresa/frambuesa', price: 1.80, desc: 'Té blanco' },
  { id: 33, cat: 'Bebidas Calientes', name: 'Manzanilla', price: 1.50, desc: 'Infusión de sobre' },
  { id: 34, cat: 'Bebidas Calientes', name: 'Tila', price: 1.50, desc: 'Infusión de sobre' },
  { id: 35, cat: 'Bebidas Calientes', name: 'Poleo menta', price: 1.50, desc: 'Infusión de sobre' },
  { id: 36, cat: 'Bebidas Calientes', name: 'Té de sobre (Negro/Rojo/Verde)', price: 1.50, desc: 'Infusión de sobre' },
  { id: 37, cat: 'Bebidas Calientes', name: 'Rooibos floral', price: 1.80, desc: 'Rooibos' },
  { id: 38, cat: 'Bebidas Calientes', name: 'Rooibos frambuesa', price: 1.80, desc: 'Rooibos' },
  { id: 39, cat: 'Bebidas Calientes', name: 'Rooibos frutas del bosque', price: 1.80, desc: 'Rooibos' },
  { id: 40, cat: 'Bebidas Calientes', name: 'Limón y jengibre', price: 1.80, desc: 'Infusiones' }
];

const CAT_IMAGES = {
  'Hamburguesas': '/assets/bar_tapas/hamburgesas2-2814416.jpg',
  'Bocadillos': '/assets/comida/bocadillos-2.jpg',
  'Sandwiches': '/assets/comida/sandwiches2.jpg',
  'Pizzas': '/assets/bar_tapas/pizzas-2814417.jpg',
  'Raciones': '/assets/bar_tapas/img-3468.jpg',
  'Bebidas Calientes': '/assets/nosotros/img-4389.jpg' // Replaced tortilla with a different interior/lounge image likely showing coffee/tea cups
};

const CategoryCard = ({ category, items, index, cart, updateCart }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const isReverse = index % 2 !== 0;

  return (
    <div className={cn("bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row p-6 md:p-8 gap-8", isReverse ? "lg:flex-row-reverse" : "")}>
      {/* Visual Section */}
      <div ref={ref} className="w-full lg:w-5/12 h-64 md:h-[400px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative shadow-inner shrink-0">
         <motion.img 
            style={{ y }}
            src={CAT_IMAGES[category]} 
            alt={category} 
            className="absolute inset-0 w-full h-[130%] object-cover -mt-[15%]"
         />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center gap-6">
         <div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#4A3B2C] tracking-tight">{category}</h2>
            <div className="w-16 h-1 bg-sierra-gold mt-4 mb-2" />
         </div>
         
         <div className="flex flex-col gap-3">
            {items.map(item => (
               <div key={item.id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-2xl hover:bg-black/5 transition-colors gap-4 border border-transparent hover:border-black/5">
                  <div className="flex-1 pr-2">
                     <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                       <h3 className="font-bold text-[#4A3B2C] text-lg leading-tight group-hover:text-terracotta-mid transition-colors">{item.name}</h3>
                       <span className="text-sm font-black text-sierra-gold">{item.price.toFixed(2)}€</span>
                     </div>
                     {item.desc && <p className="text-xs text-neutral-dark/50 mt-1 leading-relaxed">{item.desc}</p>}
                  </div>
                  
                  {/* Permanent Add to Cart Inline */}
                  <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-black/10 shrink-0 shadow-sm w-full sm:w-auto justify-between sm:justify-center">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-dark/40 pl-3 sm:hidden">Cantidad</span>
                     <div className="flex items-center gap-2">
                       <button onClick={() => updateCart(item.id, -1)} disabled={!cart[item.id]} className="w-8 h-8 rounded-full bg-black/5 text-[#4A3B2C] flex items-center justify-center disabled:opacity-30 hover:bg-black/10 transition-colors">
                         <Minus size={14} />
                       </button>
                       <span className="w-5 text-center font-bold text-sm tracking-tighter">{cart[item.id] || 0}</span>
                       <button onClick={() => updateCart(item.id, 1)} className="w-8 h-8 rounded-full bg-sierra-gold text-white flex items-center justify-center hover:bg-terracotta-mid transition-colors shadow-md">
                         <Plus size={14} />
                       </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default function Menu({ onReserve }) {
  const [cart, setCart] = useState({});

  const handleCall = () => {
    window.location.href = 'tel:+34684790308';
  };

  const updateCart = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const getCartTotal = () => {
    let total = 0;
    let count = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      const item = MENU_ITEMS.find(m => m.id === Number(id));
      if (item) {
        total += item.price * qty;
        count += qty;
      }
    });
    return { total, count };
  };

  const handleWhatsAppOrder = () => {
    const { total } = getCartTotal();
    let orderText = `*¡Hola ENCAPACO!* 👋%0A%0AQuisiera realizar el siguiente pedido para pasar a recoger:%0A%0A`;
    
    let i = 1;
    Object.entries(cart).forEach(([id, qty]) => {
      const item = MENU_ITEMS.find(m => m.id === Number(id));
      if (item) {
        orderText += `*${i}.* ${qty}x ${item.name} (${(item.price * qty).toFixed(2)}€)%0A`;
        i++;
      }
    });
    
    orderText += `%0A*Total Estimado:* ${total.toFixed(2)}€%0A%0A¿Cuál sería el tiempo aproximado para pasar a por ello?%0A%0A¡Muchas gracias! ✨`;
    window.open(`https://wa.me/34616600772?text=${orderText}`, '_blank');
    setCart({});
  };

  const { total, count } = getCartTotal();

  return (
    <div className="pt-24 pb-48 min-h-screen bg-[#FFF4E0] flex flex-col items-center overflow-x-hidden">
      
      {/* Compact Elegant Header */}
      <div className="text-center pt-8 mb-10 px-6">
        <span className="text-sierra-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-black mb-4 block">Experiencia Gastronómica</span>
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] font-serif font-black text-[#4A3B2C]">
          Sabores <br className="sm:hidden" />
          <span className="italic font-normal text-terracotta-mid">Auténticos.</span>
        </h1>
      </div>

      {/* Action Grid (Llamar, Reservar) */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl px-6 mx-auto mb-16 relative z-20">
         <button onClick={handleCall} className="group p-4 md:p-6 rounded-[1.5rem] bg-white text-[#4A3B2C] shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-3 border border-sierra-gold/20">
           <Phone size={24} className="text-sierra-gold" />
           <span className="font-serif font-bold text-sm md:text-base uppercase tracking-widest text-center">Llamar</span>
         </button>
         <button onClick={onReserve} className="group p-4 md:p-6 rounded-[1.5rem] bg-white text-[#4A3B2C] shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-3 border border-sierra-gold/20">
           <Calendar size={24} className="text-sierra-gold" />
           <span className="font-serif font-bold text-sm md:text-base uppercase tracking-widest text-center">Reservar</span>
         </button>
      </div>

      {/* Menu Categories List */}
      <div className="w-full max-w-[1200px] px-4 md:px-8 space-y-10 md:space-y-16">
        {['Hamburguesas', 'Bocadillos', 'Sandwiches', 'Pizzas', 'Raciones', 'Bebidas Calientes'].map((category, idx) => {
          const items = MENU_ITEMS.filter(item => item.cat === category);
          if (items.length === 0) return null;
          
          return (
            <CategoryCard 
              key={category} 
              category={category} 
              items={items} 
              index={idx} 
              cart={cart} 
              updateCart={updateCart} 
            />
          );
        })}
      </div>

      {/* Floating Cart Panel */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] w-[95%] max-w-2xl bg-[#4A3B2C] text-pearl-white rounded-[2rem] p-4 md:p-5 shadow-[0_30px_60px_rgba(74,59,44,0.4)] border border-white/10 flex flex-col sm:flex-row items-center justify-between"
          >
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 mb-3 sm:mb-0 px-2">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center relative shrink-0">
                     <ShoppingBag size={20} className="text-sierra-gold" />
                     <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta-mid text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">
                       {count}
                     </span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black uppercase tracking-widest text-sierra-gold opacity-80">Total de tu pedido</span>
                     <span className="text-2xl font-serif font-black leading-none">{total.toFixed(2)}€</span>
                  </div>
               </div>
            </div>
            
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full sm:w-auto bg-sierra-gold hover:bg-sierra-gold/90 text-white px-8 py-4 rounded-[1.5rem] flex items-center justify-center gap-3 text-xs md:text-sm font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg"
            >
              Pedir para Recoger <Check size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
