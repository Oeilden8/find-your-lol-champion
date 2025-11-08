import { createContext } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (value: string) => void;
};

const language = navigator.language.length > 3 ? navigator.language.slice(0, 2) : navigator.language;

export const LanguageContext = createContext<LanguageContextType>({
  language: language,
  setLanguage: () => {},
});
