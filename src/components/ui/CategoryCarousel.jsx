import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const CategoryCarousel = ({ images = [], categoryName }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Auto-scroll logic (5-7 seconds is "prudent" for premium feel)
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Handle manual navigation (swipe/drag)
  const handleDragEnd = (_, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
    if (swipe) {
      if (offset.x > 0) {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
      } else {
        setIndex((prev) => (prev + 1) % images.length);
      }
    }
  };

  if (!images || images.length === 0) return null;
  
  if (images.length === 1) {
    return (
      <img 
        src={images[0]} 
        alt={categoryName} 
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          alt={`${categoryName} image ${index + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Progress Indicators (Premium dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-1 transition-all duration-500 rounded-full bg-white",
              index === i ? "w-8 opacity-100" : "w-2 opacity-30"
            )}
          />
        ))}
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-neutral-dark/10 pointer-events-none" />
    </div>
  );
};

export default CategoryCarousel;
