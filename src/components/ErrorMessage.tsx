import poro from '../assets/images/sadPoro.png';
import { goldColor } from '../utils/colors';

function ErrorMessage() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <img alt='image of a sad poro' src={poro} width={'65%'} />
      <p style={{ fontFamily: 'BeaufortHeavy', fontSize: 25, color: goldColor }}>
        Oups! Quelque chose d&#8216;inattendu s&#8216;est produit !
      </p>
    </div>
  );
}

export default ErrorMessage;
