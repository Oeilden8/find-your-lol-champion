import { useContext, useEffect, useMemo, useState } from 'react';
import './Home.css';
import { getChampionsList, getDataDragonVersion } from '../services/dataDragon';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../App';
import { Champion } from '../types/Champions';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import ChampionCard from '../components/ChampionCard/ChampionCard';
import SelectWithDropdown, { SelectOption } from '../components/SelectWithDropdown/SelectWithDropdown';
import { findChampionTypes } from '../utils/functions';
import { languageFormatter } from '../utils/formatter';
import { goldColor, hextechBlackColor } from '../utils/colors';

function Home() {
  const [version, setVersion] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [championsList, setChampionsList] = useState<Champion[] | undefined>();
  const [typeSelected, setTypeSelected] = useState<SelectOption | undefined>();

  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

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
        getChampionsList(version, languageFormatter(language))
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

  const championTypes = useMemo(() => championsList && findChampionTypes(championsList), [championsList]);

  const filteredChampionByType = useMemo(
    () =>
      championsList && typeSelected
        ? championsList.filter((champ) => champ.tags.includes(typeSelected.value))
        : championsList,
    [championsList, typeSelected],
  );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <>
          <p style={{ fontFamily: 'BeaufortHeavy', fontSize: 20 }}>
            {t('home.welcome')} {version}
          </p>

          {championTypes && (
            <section style={{ display: 'flex' }}>
              {/* <p>Je choisis mon style de jeu</p> */}

              <SelectWithDropdown
                options={championTypes}
                label={'Tous'}
                dropDownMargin={{ top: '10px', left: '-11px' }}
                onSelect={(option) => {
                  option === typeSelected ? setTypeSelected(undefined) : setTypeSelected(option);
                }}
                selectedOption={typeSelected}
                isSelect
                width={170}
                style={{
                  backgroundColor: hextechBlackColor,
                  border: `1px solid ${goldColor}`,
                  padding: 10,
                }}
              />
            </section>
          )}

          <ul className='championList'>
            {filteredChampionByType &&
              filteredChampionByType.map((champion) => <ChampionCard champion={champion} key={champion.key} />)}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
