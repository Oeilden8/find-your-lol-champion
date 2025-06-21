import { useTranslation } from 'react-i18next';
import './ScrollTopButton.css';

function ScrollTopButton() {
  const { t } = useTranslation();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <button type='button' aria-label={t('scroll')} className='scrollButton' onClick={handleScrollTop} />;
}

export default ScrollTopButton;
