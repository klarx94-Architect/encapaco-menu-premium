import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function AgentButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  const startWhatsApp = () => {
    const phone = "34616600772";
    const message = encodeURIComponent("Hola, me gustaría solicitar una reserva para una experiencia gastronómica en ENCAPACO.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-charcoal border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
            
            <h4 className="text-gold font-bold text-xs uppercase tracking-widest mb-2">Concierge ENCAPACO</h4>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Nuestro asistente personal le ayudará a coordinar su visita o evento privado de forma inmediata.
            </p>
            
            <button 
              onClick={startWhatsApp}
              className="w-full py-3 bg-gold text-charcoal font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gold/90 transition-all font-sans"
            >
              Contactar por WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gold shadow-lg shadow-gold/20 flex items-center justify-center text-charcoal overflow-hidden"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>
    </div>
  );
}
