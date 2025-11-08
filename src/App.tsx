import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './i18n';
import Home from './pages/Home/Home';
import Champion from './pages/Champion/Champion';
import MainLayout from './components/MainLayout/MainLayout';
import i18n from './i18n';
import { LanguageContext } from './context/LanguageContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='champion/:version/:id' element={<Champion />} />
    </Route>,
  ),
  { basename: '/find-your-lol-champion/' },
);

function App() {
  const [language, setLanguage] = useState<string>(
    navigator.language.length > 3 ? navigator.language.slice(0, 2) : navigator.language,
  );

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
