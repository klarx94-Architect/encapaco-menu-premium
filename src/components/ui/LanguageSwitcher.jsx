import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../lib/utils';

const LanguageSwitcher = ({ className }) => {
  const { setLanguage, language } = useLanguage();
  
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {['ES', 'EN', 'FR'].map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang.toLowerCase())}
          className={cn(
            "text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
            language === lang.toLowerCase() 
              ? "text-neutral-dark" 
              : "text-neutral-dark/30 hover:text-neutral-dark hover:scale-105"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
