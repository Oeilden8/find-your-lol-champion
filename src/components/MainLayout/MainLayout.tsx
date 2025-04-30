import { useContext } from 'react';

import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import { LanguageContext } from '../../App';

function MainLayout() {
  const { setLanguage } = useContext(LanguageContext);
  return (
    <div className='mainLayout'>
      <section className='mainContainer'>
        <button type='button' onClick={() => setLanguage('fr')}>
          FR
        </button>
        <button type='button' onClick={() => setLanguage('en')}>
          EN
        </button>

        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
