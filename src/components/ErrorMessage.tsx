import { useTranslation } from 'react-i18next';
import poro from '../assets/images/sadPoro.png';
import { goldColor } from '../utils/colors';

function ErrorMessage() {
  const { t } = useTranslation();
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <img alt='image of a sad poro' src={poro} width={'65%'} />
      <p style={{ fontFamily: 'BeaufortHeavy', fontSize: 25, color: goldColor }}>{t('error.general')}</p>
    </div>
  );
}

export default ErrorMessage;
