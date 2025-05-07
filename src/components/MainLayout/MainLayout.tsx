import { useContext, useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import { LanguageContext } from '../../context/LanguageContext';
import SelectWithDropdown from '../SelectWithDropdown/SelectWithDropdown';
import FrIcon from '../../assets/icons/languagesIcons_FR.svg?react';
import EnIcon from '../../assets/icons/languagesIcons_EN.svg?react';
import ScrollTopButton from '../ScrollTopButton/ScrollTopButton';

function MainLayout() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const languageIconStyle = { width: 30, fill: 'white' };

  useEffect(() => {
    const handleScrollButtonDisplay = () => {
      window.pageYOffset > 300 ? setShowScrollButton(true) : setShowScrollButton(false);
    };

    window.addEventListener('scroll', handleScrollButtonDisplay);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonDisplay);
    };
  }, []);

  return (
    <div className='mainLayout'>
      <section className='mainContainer'>
        {showScrollButton && <ScrollTopButton />}

        <div className='languageButtonContainer'>
          <SelectWithDropdown
            options={[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
            ]}
            label={language === 'fr' ? <FrIcon {...languageIconStyle} /> : <EnIcon {...languageIconStyle} />}
            onSelect={(option) => setLanguage(option.value)}
            width={80}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          />
        </div>
        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
