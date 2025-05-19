import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { useParams } from 'react-router-dom';
import './Champion.css';
import { getOneChampion } from '../../services/dataDragon';
import { ChampionDetails, ChampionSpell } from '../../types/Champions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import loading from '../../assets/icons/loading-buffer.gif';
import { formatImageUrl, formatPassiveImageUrl, formatSpellImageUrl } from '../../utils/formatter';
import { goldColor } from '../../utils/colors';

function Champion() {
  const { id, version } = useParams();
  const { language } = useContext(LanguageContext);

  const [isChampLoading, setIsChampLoading] = useState<boolean>(true);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [champion, setChampion] = useState<ChampionDetails | undefined>();
  const [spellSelected, setSpellSelected] = useState<ChampionSpell | undefined>();

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

  useEffect(() => {
    // to refresh spells if champion is refetch, from language for example
    if (champion) {
      setSpellSelected(champion?.passive);
    }
  }, [champion]);

  const handleFormatPassive = (string: string) => {
    // passive description sometimes has one tag inside like <weird>text</weird>
    // to do: more flexible function, like for multiple tags

    const array = Array.from(string);
    const index = array
      .map((letter, index) => {
        if (letter === '>' || letter === '<') return index;
      })
      .filter((l) => l !== undefined);

    const first = array.slice(0, index[0]).join('');
    const mid = array.slice(index[1] + 1, index[2]).join('');
    const final = array.slice(index[3] + 1).join('');

    return first.concat(mid).concat(final);
  };

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

          <section className='championStats'>
            <article>
              <div className='spellsContainer'>
                <button
                  className='spellButton passive'
                  type='button'
                  onClick={() => setSpellSelected(champion.passive)}
                  style={
                    spellSelected?.name === champion.passive.name ? { border: `2px solid ${goldColor}` } : undefined
                  }
                >
                  <img
                    alt='passive spell icon'
                    src={formatPassiveImageUrl(champion.passive.image.full, version || '15.7.1')}
                  />
                </button>
                <div className='spellSeparator' />
                {champion.spells.map((spell, index) => (
                  <button
                    key={index}
                    className='spellButton general'
                    type='button'
                    onClick={() => setSpellSelected(spell)}
                    style={spellSelected?.name === spell.name ? { border: `2px solid ${goldColor}` } : undefined}
                  >
                    <img
                      alt={`${spell.name} spell icon`}
                      src={formatSpellImageUrl(spell.image.full, version || '15.7.1')}
                    />
                  </button>
                ))}
              </div>

              {spellSelected && (
                <div className='descriptionContainer'>
                  <div className='descriptionSeparator' />
                  <h2>{spellSelected.name}</h2>
                  <p className='spellInfo'>
                    {spellSelected?.name === champion.passive.name
                      ? handleFormatPassive(spellSelected.description)
                      : spellSelected.description}
                  </p>
                </div>
              )}
            </article>
          </section>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}

export default Champion;
