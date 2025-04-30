import { useEffect, useState } from 'react';
import { getChampionsList, getDataDragonVersion } from '../services/dataDragon';
import { languageFormatter } from '../utils/formatter';
import { Champion } from '../types/Champions';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

function Home() {
  const [version, setVersion] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [championsList, setChampionsList] = useState<Champion[] | undefined>();
  const language = languageFormatter(navigator.language);

  useEffect(() => {
    const fetchVersion = () =>
      getDataDragonVersion()
        .then((resp) => setVersion(resp[0]))
        .catch((err) => {
          console.log(err);
          setVersion('15.7.1');
        });

    fetchVersion();
  }, []);

  useEffect(() => {
    const fetchChampions = () => {
      if (version) {
        getChampionsList(version, language)
          .then((resp) => {
            const values = Object.values(resp.data);
            setChampionsList(values);
            setIsLoading(false);
            setIsError(false);
          })
          .catch((err) => {
            console.log(err);
            setIsError(true);
          });
      }
    };

    fetchChampions();
  }, [language, version]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <>
          <p style={{ fontFamily: 'BeaufortHeavy', fontSize: 20 }}>Home {version}</p>
          <ul>{championsList && championsList.map((champion) => <li key={champion.key}>{champion.name}</li>)}</ul>
        </>
      )}
    </div>
  );
}

export default Home;
