import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import './i18n';
import Home from './pages/Home';
import MainLayout from './components/MainLayout/MainLayout';
import i18n from './i18n';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/find-your-lol-champion/' element={<MainLayout />}>
      <Route index element={<Home />} />
      {/* <Route path='/champion' element={<Champion />} /> */}
    </Route>,
  ),
);

type LanguageContextType = {
  language: string;
  setLanguage: (value: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: navigator.language,
  setLanguage: () => {},
});

function App() {
  const [language, setLanguage] = useState<string>(navigator.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <RouterProvider router={router} />
    </LanguageContext.Provider>
  );
}

export default App;
