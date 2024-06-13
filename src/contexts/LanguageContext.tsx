import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../locales/en';
import ptbr from '../locales/pt-br';

interface LanguageContextType {
    translations: typeof en;
    setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState('ptbr');
    const translations = language === 'ptbr' ? ptbr : en;

    return (
        <LanguageContext.Provider value={{ translations, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslation = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
