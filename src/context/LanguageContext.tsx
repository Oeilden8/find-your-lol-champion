import { createContext } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (value: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: navigator.language,
  setLanguage: () => {},
});
