import { useContext, useEffect, useMemo, useState } from 'react';
import './Home.css';
import { getChampionsList, getDataDragonVersion } from '../services/dataDragon';
import { LanguageContext } from '../context/LanguageContext';
import { useTranslation, Trans } from 'react-i18next';
import { Champion } from '../types/Champions';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import ChampionCard from '../components/ChampionCard/ChampionCard';
import SelectWithDropdown, { SelectOption } from '../components/SelectWithDropdown/SelectWithDropdown';
import { findChampionTypes } from '../utils/functions';
import { languageFormatter } from '../utils/formatter';
import { goldColor, hextechBlackColor } from '../utils/colors';
import GeneralModal from '../components/Modals/GeneralModal';

enum OrderOptions {
  NAME_ASC = 'nameAsc',
  NAME_DESC = 'nameDesc',
  DIFFICULTY_ASC = 'difficultyAsc',
  DIFFICULTY_DESC = 'difficultyDesc',
}

function Home() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const [version, setVersion] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [championsList, setChampionsList] = useState<Champion[] | undefined>();
  const [typeSelected, setTypeSelected] = useState<SelectOption | undefined>();
  const [orderBy, setOrderBy] = useState<SelectOption>({
    value: OrderOptions.NAME_ASC,
    label: `order.${OrderOptions.NAME_ASC}`,
  });

  const orderOptions = [
    { value: OrderOptions.NAME_ASC, label: `order.${OrderOptions.NAME_ASC}` },
    { value: OrderOptions.NAME_DESC, label: `order.${OrderOptions.NAME_DESC}` },
    { value: OrderOptions.DIFFICULTY_ASC, label: `order.${OrderOptions.DIFFICULTY_ASC}` },
    { value: OrderOptions.DIFFICULTY_DESC, label: `order.${OrderOptions.DIFFICULTY_DESC}` },
  ];

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

  const orderedChampions = useMemo(() => {
    if (filteredChampionByType) {
      switch (orderBy.value) {
        case OrderOptions.NAME_ASC as string:
          return filteredChampionByType;
        case OrderOptions.NAME_DESC as string:
          return Array.from(filteredChampionByType).reverse();
        case OrderOptions.DIFFICULTY_ASC as string:
          return Array.from(filteredChampionByType).sort(
            (champA, champB) => champA.info.difficulty - champB.info.difficulty,
          );
        case OrderOptions.DIFFICULTY_DESC as string:
          return Array.from(filteredChampionByType).sort(
            (champA, champB) => champB.info.difficulty - champA.info.difficulty,
          );
        default:
          return filteredChampionByType;
      }
    }
  }, [filteredChampionByType, orderBy.value]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <>
          <h1>{t('home.title')}</h1>

          {isInfoModalOpen && championTypes && (
            <GeneralModal setIsOpen={setIsInfoModalOpen}>
              <p className='infoTitle'>{t('home.game')}</p>
              {championTypes.map((type, index) => (
                <p className='typeInfo' key={index}>
                  <Trans
                    defaults={'...'}
                    i18nKey={`home.${type.value}`}
                    components={{ span: <span style={{ color: goldColor, fontFamily: 'BeaufortBold' }} /> }}
                  />
                </p>
              ))}
              <button type='button' className='leagueButton' onClick={() => setIsInfoModalOpen(false)}>
                {t('close')}
              </button>
            </GeneralModal>
          )}

          {championTypes && (
            <section className='selectContainer'>
              <div className='select'>
                <p>{t('home.gameStyle')}</p>
                <button type='button' className='infoButton' onClick={() => setIsInfoModalOpen(true)}>
                  i
                </button>
                <SelectWithDropdown
                  options={championTypes}
                  label={t('home.all')}
                  onSelect={(option) => {
                    option === typeSelected ? setTypeSelected(undefined) : setTypeSelected(option);
                  }}
                  selectedOption={typeSelected}
                  isSelect
                  width={160}
                  style={{
                    backgroundColor: hextechBlackColor,
                    border: `1px solid ${goldColor}`,
                    padding: 10,
                  }}
                />
              </div>

              <div className='select'>
                <p>{t('home.orderBy')}</p>
                <SelectWithDropdown
                  options={orderOptions}
                  onSelect={(option) => {
                    setOrderBy(option);
                  }}
                  selectedOption={orderBy}
                  isSelect
                  width={160}
                  style={{
                    backgroundColor: hextechBlackColor,
                    border: `1px solid ${goldColor}`,
                    padding: 10,
                  }}
                />
              </div>
            </section>
          )}

          <ul className='championList'>
            {orderedChampions &&
              orderedChampions.map((champion) => <ChampionCard champion={champion} key={champion.key} />)}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
