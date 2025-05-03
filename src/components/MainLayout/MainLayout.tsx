import { useContext } from 'react';

import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import { LanguageContext } from '../../App';
import SelectWithDropdown from '../SelectWithDropdown';
import FrIcon from '../../assets/icons/languagesIcons_FR.svg?react';
import EnIcon from '../../assets/icons/languagesIcons_EN.svg?react';

function MainLayout() {
  const { language, setLanguage } = useContext(LanguageContext);
  const languageIconStyle = { width: 30, fill: 'white' };
  return (
    <div className='mainLayout'>
      <section className='mainContainer'>
        <div className='languageButtonContainer'>
          <SelectWithDropdown
            dropDownMargin={35}
            options={[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
            ]}
            label={language === 'fr' ? <FrIcon {...languageIconStyle} /> : <EnIcon {...languageIconStyle} />}
            onSelect={(option) => setLanguage(option.value)}
          />
        </div>
        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
