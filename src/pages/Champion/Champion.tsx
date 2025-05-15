import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { useParams } from 'react-router-dom';
import './Champion.css';
import { getOneChampion } from '../../services/dataDragon';
import { ChampionDetails } from '../../types/Champions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import loading from '../../assets/icons/loading-buffer.gif';
import { formatImageUrl } from '../../utils/formatter';

function Champion() {
  const { id, version } = useParams();
  const { language } = useContext(LanguageContext);

  const [isChampLoading, setIsChampLoading] = useState<boolean>(true);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [champion, setChampion] = useState<ChampionDetails | undefined>();

  useEffect(() => {
    const fetchChampions = () => {
      if (version && id) {
        getOneChampion(version, language, id)
          .then((resp) => {
            const values = resp.data[id];
            setChampion(values);
            setIsChampLoading(false);
          })
          .catch((err) => {
            setIsChampLoading(false);
            console.log('fetch champion', err);
          });
      }
    };

    fetchChampions();
  }, [language, version, id]);

  return (
    <div>
      {isChampLoading ? (
        <Loading />
      ) : champion ? (
        <div>
          <section className='coverContainer'>
            <div className='championNameCard'>
              <h2>{champion.name}</h2>
              <h3>{champion.title}</h3>
            </div>

            {!isImageLoaded && <img src={loading} alt='icon indicating loading' width={50} />}

            <div className='championCover'>
              <img
                className='championFullImage'
                alt={`illustration of ${champion.name}`}
                src={formatImageUrl(champion.id, '0')}
                onLoad={() => setIsImageLoaded(true)}
              />
              <div className='imageGradient'></div>
            </div>
          </section>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}

export default Champion;
