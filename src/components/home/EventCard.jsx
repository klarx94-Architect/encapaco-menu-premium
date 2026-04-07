import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function EventCard({ image, title, date, time, location, category }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-wood/30 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gold text-charcoal px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-brand font-bold text-white mb-4 group-hover:text-gold transition-colors">
          {title}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <Calendar size={16} className="text-gold" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <Clock size={16} className="text-gold" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <MapPin size={16} className="text-gold" />
            <span>{location}</span>
          </div>
        </div>

        <button className="w-full py-3 bg-white/5 hover:bg-gold text-white hover:text-charcoal border border-white/10 hover:border-gold rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-sm">
          Reservar Plaza
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
