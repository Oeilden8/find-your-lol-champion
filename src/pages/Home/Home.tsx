import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { getChampionsList, getDataDragonVersion } from '../../services/dataDragon';
import { LanguageContext } from '../../context/LanguageContext';
import { useTranslation, Trans } from 'react-i18next';
import { Champion } from '../../types/Champions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import ChampionCard from '../../components/ChampionCard/ChampionCard';
import SelectWithDropdown, { SelectOption } from '../../components/SelectWithDropdown/SelectWithDropdown';
import GeneralModal from '../../components/Modals/GeneralModal';
import MainInput from '../../components/MainInput/MainInput';
import poro from '../../assets/images/sadPoro.png';
import { findChampionTypes } from '../../utils/functions';
import { goldColor, hextechBlackColor } from '../../utils/colors';

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
  const [searchValue, setSearchValue] = useState<string>('');
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
          console.log('fetch version', err);
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
            console.log('fetch champions', err);
            setIsLoading(false);
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

  const filteredChampionByName = useMemo(
    () =>
      orderedChampions && searchValue
        ? orderedChampions.filter(
            (champ) =>
              champ.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              champ.id.toLowerCase().includes(searchValue.toLowerCase()),
          )
        : orderedChampions,
    [orderedChampions, searchValue],
  );

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
              <button
                type='button'
                className='leagueButton'
                aria-label={t('close')}
                onClick={() => setIsInfoModalOpen(false)}
              >
                {t('close')}
              </button>
            </GeneralModal>
          )}

          {championTypes && (
            <section className='selectContainer'>
              <div className='select'>
                <p>{t('home.gameStyle')}</p>
                <button
                  type='button'
                  className='infoButton'
                  aria-label={t('home.infoButton')}
                  onClick={() => setIsInfoModalOpen(true)}
                >
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
                  hoverStyle='gold'
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
                  hoverStyle='gold'
                />
              </div>

              <MainInput
                isSearch
                name='searchChampion'
                placeholder={t('home.search')}
                value={searchValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
              />
            </section>
          )}

          <ul className='championList'>
            {filteredChampionByName && filteredChampionByName.length > 0 ? (
              filteredChampionByName.map((champion) => (
                <Link
                  to={`champion/${version}/${champion.id}`}
                  key={champion.key}
                  className='championLink'
                  state={version}
                  aria-label={t('home.champButton')}
                >
                  <ChampionCard champion={champion} />
                </Link>
              ))
            ) : (
              <div className='noResult'>
                <img alt='image of a sad poro' src={poro} width={'150px'} />
                <p>{t('home.noResult')}</p>
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
