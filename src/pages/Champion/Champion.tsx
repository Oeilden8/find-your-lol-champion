import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { useParams } from 'react-router-dom';
import './Champion.css';
import { getOneChampion } from '../../services/dataDragon';
import { ChampionDetails } from '../../types/Champions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

function Champion() {
  const { id, version } = useParams();
  const { language } = useContext(LanguageContext);
  const [isChampError, setIsChampError] = useState<boolean>(false);
  const [isChampLoading, setIsChampLoading] = useState<boolean>(true);
  const [champion, setChampion] = useState<ChampionDetails | undefined>();

  useEffect(() => {
    const fetchChampions = () => {
      if (version && id) {
        getOneChampion(version, language, id)
          .then((resp) => {
            const values = resp.data[id];
            setChampion(values);
            setIsChampLoading(false);
            setIsChampError(false);
          })
          .catch((err) => {
            console.log('fetch champion', err);
            setIsChampError(true);
          });
      }
    };

    fetchChampions();
  }, [language, version, id]);

  return (
    <div>
      {isChampLoading ? (
        <Loading />
      ) : isChampError ? (
        <ErrorMessage />
      ) : (
        <h1>
          {champion?.name}, {champion?.title}
        </h1>
      )}
    </div>
  );
}

export default Champion;
