import { useEffect, useState } from 'react';
import { getChampionsList, getDataDragonVersion } from '../services/dataDragon';
import { languageFormatter } from '../utils/formatter';
import { Champion } from '../types/Champions';

function Home() {
  const [version, setVersion] = useState<string>('15.7.1');
  const [championsList, setChampionsList] = useState<Champion[] | undefined>();
  const language = languageFormatter(navigator.language);

  useEffect(() => {
    const fetchVersion = () =>
      getDataDragonVersion()
        .then((resp) => setVersion(resp[0]))
        .catch((err) => console.log(err));

    fetchVersion();
  }, []);

  useEffect(() => {
    const fetchChampions = () =>
      getChampionsList(version, language)
        .then((resp) => {
          const values = Object.values(resp.data);
          setChampionsList(values);
        })
        .catch((err) => console.log(err));

    fetchChampions();
  }, [language, version]);

  return (
    <div>
      <p style={{ fontFamily: 'BeaufortHeavy', fontSize: 20 }}>Home {version}</p>
      <ul>{championsList && championsList.map((champion) => <li key={champion.key}>{champion.name}</li>)}</ul>
    </div>
  );
}

export default Home;
