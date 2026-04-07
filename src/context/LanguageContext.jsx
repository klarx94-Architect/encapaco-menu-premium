import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('encapaco_lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('encapaco_lang', language);
    // Optionally update document lang for SEO
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    
    const getNested = (obj, pathKeys) => {
      let current = obj;
      for (const key of pathKeys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return undefined;
        }
      }
      return current;
    };

    let result = getNested(translations[language], keys);
    
    if (result === undefined && language !== 'es') {
      result = getNested(translations['es'], keys);
    }
    
    return result !== undefined ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
