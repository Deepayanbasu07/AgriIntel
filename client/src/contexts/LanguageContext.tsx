import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, useTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof useTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage first
    const saved = localStorage.getItem('agriintel-language');
    return (saved as Language) || 'en';
  });

  const t = useTranslation(language);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agriintel-language', lang);
  };

  useEffect(() => {
    // Update document direction for RTL languages (future enhancement)
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}