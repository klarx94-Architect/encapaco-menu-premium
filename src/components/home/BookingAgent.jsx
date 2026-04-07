import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Smartphone, X, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const CustomDatePicker = ({ selectedDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || new Date()));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const today = new Date();
  today.setHours(0,0,0,0);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const currentSelectedDate = new Date(selectedDate);
  const formatDisplayDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const days = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8 md:w-10 md:h-10"></div>);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const tileDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    const isPast = tileDate < today;
    const isMonday = tileDate.getDay() === 1; // 1 = Monday
    const isDisabled = isPast || isMonday;
    const isSelected = tileDate.toDateString() === currentSelectedDate.toDateString();

    days.push(
      <button
        key={i}
        disabled={isDisabled}
        onClick={(e) => { e.stopPropagation(); handleSelect(i); }}
        className={cn(
          "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all",
          isDisabled ? "text-neutral-dark/20 cursor-not-allowed" : "cursor-pointer",
          isSelected ? "bg-sierra-gold text-white shadow-xl" : (isDisabled ? "" : "hover:bg-sierra-gold/10 text-neutral-dark")
        )}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="relative w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/5 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-serif font-bold cursor-pointer hover:bg-black/10 transition-colors flex justify-between items-center"
      >
        <span className="capitalize">{formatDisplayDate(selectedDate)}</span>
        <CalendarIcon size={20} className="text-neutral-dark/40" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full left-0 mt-4 w-full md:w-[120%] bg-white rounded-3xl shadow-2xl z-50 p-6 border border-black/5"
          >
            <div className="flex justify-between items-center mb-6">
              <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-black/5 rounded-full"><ArrowRight size={16} className="rotate-180" /></button>
              <span className="font-serif font-black text-lg md:text-xl uppercase tracking-widest text-[#4A3B2C]">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-black/5 rounded-full"><ArrowRight size={16} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, idx) => (
                <div key={d} className={cn("w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-black uppercase", idx === 0 ? "text-neutral-dark/20 line-through" : "text-sierra-gold/50")}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days}
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 text-center text-[10px] uppercase font-bold tracking-widest text-terracotta-mid">
              Lunes Cerrado por Descanso
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BookingAgent({ isOpen, onClose }) {
  const [phase, setPhase] = useState(1);
  const [booking, setBooking] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '20:30',
    adults: 2,
    area: 'interior',
    name: '',
    phone: ''
  });

  const handleWhatsApp = () => {
    const message = `*Reserva Confirmada - ENCAPACO*%0A%0A📅 *Fecha:* ${booking.date}%0A⏰ *Hora:* ${booking.time}%0A👥 *Pax:* ${booking.adults}%0A📍 *Zona:* ${booking.area.toUpperCase()}%0A👤 *Cliente:* ${booking.name}%0A📞 *Tel:* ${booking.phone}%0A%0A_Digital Host via ENCAPACO_`;
    window.open(`https://wa.me/34616600772?text=${message}`, '_blank');
  };

  const handleWhatsAppDirect = () => {
    window.open(`https://wa.me/34616600772?text=Hola,%20me%20gustaría%20hacer%20una%20consulta%20directa%20sobre%20reservas.`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-neutral-dark/95 backdrop-blur-xl overflow-y-auto"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 50 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl bg-pearl-white rounded-[2rem] md:rounded-[3rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] flex flex-col my-auto relative"
          >
            {/* Minimal Header */}
            <div className="flex justify-between items-center px-6 py-4 md:px-10 md:py-6 border-b border-black/5 shrink-0 rounded-t-[2rem] md:rounded-t-[3rem]">
              <div className="flex items-center gap-6 md:gap-12">
                 <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-neutral-dark/40">Digital Host</span>
                 <div className="flex gap-3 md:gap-4">
                    {[1, 2, 3].map(s => (
                      <div key={s} className={cn("w-2 h-2 rounded-full transition-all", phase >= s ? "bg-sierra-gold scale-125" : "bg-neutral-dark/10")} />
                    ))}
                 </div>
              </div>
              <button onClick={onClose} className="p-2 md:p-3 hover:bg-black/5 rounded-full transition-colors"><X size={20} className="md:w-6 md:h-6" /></button>
            </div>

            {/* Inmersive Content */}
            <div className="flex-1 px-6 py-8 md:px-12 md:py-12 relative z-10">
               <AnimatePresence mode="wait">
                 {phase === 1 && (
                   <motion.div key="p1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center text-center">
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black mb-8 md:mb-12">¿Cuándo <span className="italic font-normal text-terracotta-mid">unimos</span> ritmos?</h2>
                     <div className="grid md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl mb-8 relative">
                        <div className="flex flex-col items-start gap-3 relative z-[200]">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-dark/40 ml-2">Fecha Preferida</span>
                           <CustomDatePicker selectedDate={booking.date} onChange={(date) => setBooking({...booking, date})} />
                        </div>
                        <div className="flex flex-col items-start gap-3">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-dark/40 ml-2">Hora</span>
                           <select 
                             value={booking.time} 
                             onChange={e => setBooking({...booking, time: e.target.value})} 
                             className="w-full bg-black/5 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-serif font-bold focus:ring-2 focus:ring-sierra-gold/20 outline-none appearance-none cursor-pointer"
                           >
                             <option value="13:00">13:00</option>
                             <option value="13:30">13:30</option>
                             <option value="14:00">14:00</option>
                             <option value="14:30">14:30</option>
                             <option value="15:00">15:00</option>
                             <option value="20:00">20:00</option>
                             <option value="20:30">20:30</option>
                             <option value="21:00">21:00</option>
                             <option value="21:30">21:30</option>
                             <option value="22:00">22:00</option>
                           </select>
                        </div>
                        <div className="flex flex-col items-start gap-3">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-dark/40 ml-2">Personas</span>
                           <div className="flex items-center justify-between w-full bg-black/5 p-4 md:p-6 rounded-2xl">
                              <button onClick={() => setBooking({...booking, adults: Math.max(1, booking.adults-1)})} className="text-2xl md:text-3xl font-serif opacity-30 hover:opacity-100 transition-opacity w-10">-</button>
                              <span className="text-2xl md:text-3xl font-serif font-bold">{booking.adults}</span>
                              <button onClick={() => setBooking({...booking, adults: booking.adults+1})} className="text-2xl md:text-3xl font-serif opacity-30 hover:opacity-100 transition-opacity w-10">+</button>
                           </div>
                        </div>
                     </div>
                     <button onClick={handleWhatsAppDirect} className="mt-2 flex items-center justify-center gap-2 text-[#25D366] font-bold hover:underline transition-all bg-[#25D366]/10 px-6 py-3 rounded-full">
                       <Smartphone size={18} /> Contactar directo por WhatsApp
                     </button>
                   </motion.div>
                 )}
                 
                 {phase === 2 && (
                   <motion.div key="p2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center">
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black mb-8 md:mb-12">Elige tu <span className="italic font-normal text-terracotta-mid">escenario.</span></h2>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full max-w-3xl">
                        {['Interior', 'Terraza', 'Barra'].map(area => (
                          <div 
                            key={area} 
                            onClick={() => setBooking({...booking, area: area.toLowerCase()})}
                            className={cn("p-6 md:p-8 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-3",
                              booking.area === area.toLowerCase() ? "border-sierra-gold bg-sierra-gold/5 shadow-xl" : "border-black/5 bg-white hover:border-sierra-gold/30")}
                          >
                             <span className="text-sm md:text-base font-serif font-black uppercase tracking-widest">{area}</span>
                             <div className={cn("w-2 h-2 rounded-full", booking.area === area.toLowerCase() ? "bg-sierra-gold" : "bg-neutral-dark/5")} />
                          </div>
                        ))}
                     </div>
                   </motion.div>
                 )}

                 {phase === 3 && (
                   <motion.div key="p3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center max-w-md mx-auto w-full text-center">
                     <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">Casi <span className="italic font-normal text-terracotta-mid">listo.</span></h2>
                     <p className="text-neutral-dark/60 font-serif italic mb-8 md:mb-12 text-sm md:text-base">Danos tu nombre y contacto para sellar el encuentro.</p>
                     <div className="w-full space-y-4 md:space-y-6">
                        <input placeholder="Nombre Completo" value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} className="w-full bg-black/5 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-serif font-bold placeholder:opacity-30 outline-none focus:ring-2 focus:ring-sierra-gold/30 transition-all" />
                        <input placeholder="Teléfono / WhatsApp" value={booking.phone} onChange={e => setBooking({...booking, phone: e.target.value})} className="w-full bg-black/5 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-serif font-bold placeholder:opacity-30 outline-none focus:ring-2 focus:ring-sierra-gold/30 transition-all" />
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Layout Footer */}
            <div className="px-6 py-6 md:px-10 md:py-8 flex justify-between items-center bg-white border-t border-black/5 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-b-[2rem] md:rounded-b-[3rem] relative z-0">
               <button disabled={phase === 1} onClick={() => setPhase(p => p-1)} className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-neutral-dark/40 hover:text-neutral-dark disabled:opacity-0 transition-colors py-2">Atrás</button>
               {phase < 3 ? (
                 <button onClick={() => setPhase(p => p+1)} className="group flex items-center gap-4 md:gap-6 text-neutral-dark">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mt-1">Continuar</span>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-sierra-gold flex items-center justify-center text-white md:scale-110 group-hover:scale-125 transition-transform"><ArrowRight size={20} /></div>
                 </button>
               ) : (
                 <button onClick={handleWhatsApp} className="group flex items-center gap-4 md:gap-6 text-[#25D366]">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mt-1">Finalizar Reserva</span>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white md:scale-110 group-hover:scale-125 transition-transform shadow-lg"><Smartphone size={20} /></div>
                 </button>
               )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
