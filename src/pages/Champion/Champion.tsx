import { useContext, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Champion.css';
import { getOneChampion } from '../../services/dataDragon';
import { ChampionDetails, ChampionSpell } from '../../types/Champions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { formatImageUrl, formatPassiveImageUrl, formatSpellImageUrl } from '../../utils/formatter';
import { goldColor } from '../../utils/colors';
import { OPGuideUrl, UGGuideUrl } from '../../utils/url';
import ImageCarousel from '../../components/Carousel/ImageCarousel';

function Champion() {
  const { id, version } = useParams();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const [isChampLoading, setIsChampLoading] = useState<boolean>(true);
  const [champion, setChampion] = useState<ChampionDetails | undefined>();
  const [spellSelected, setSpellSelected] = useState<ChampionSpell | undefined>();

  useEffect(() => {
    const fetchChampions = () => {
      if (version && id) {
        getOneChampion(version, language, id)
          .then((resp) => {
            const value = resp.data[id];
            // passive spell description sometimes have br and weird tags
            const removeBrFromPassive = value.passive.description.replace(/<br>/g, ' ');
            const correctedPassive = removeBrFromPassive.replace(/(<([^>]+)>)/gi, '');
            value.passive.description = correctedPassive;

            setChampion(value);
            setSpellSelected(value.passive);
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

  const skinImages = useMemo(() => {
    const skins =
      champion &&
      champion.skins.map((skin) => {
        return { name: skin.name, src: formatImageUrl(champion.id, skin.num.toString()) };
      });
    return skins;
  }, [champion]);

  return (
    <main>
      {isChampLoading ? (
        <Loading />
      ) : champion ? (
        <div>
          <section className='coverContainer'>
            <div className='championNameCard'>
              <h2>{champion.name}</h2>
              <h3>{champion.title}</h3>
            </div>

            {skinImages && <ImageCarousel images={skinImages} championName={champion.name} />}
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
                    aria-label={spell.name}
                    type='button'
                    onClick={() => setSpellSelected({ ...spell, description: spell.description.replace(/<br>/g, ' ') })}
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
                  <p className='spellInfo'>{spellSelected.description}</p>
                </div>
              )}
            </article>

            <article className='loreContainer'>
              <h2>{t('champion.history')}</h2>
              <p className='spellInfo'>{champion.lore}</p>
            </article>
          </section>

          {champion.allytips.length > 0 && champion.enemytips.length > 0 && <div className='globalSeparator' />}
          {champion.allytips.length > 0 && champion.enemytips.length > 0 && (
            <section className='championStats'>
              <article className='descriptionContainer'>
                <h2 style={{ color: 'green' }}>
                  {t('champion.ally')} {champion.name}
                </h2>
                <ul className='tips'>
                  {champion.allytips.map((tip, index) => (
                    <li className='spellInfo' key={index}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </article>
              <article className='descriptionContainer'>
                <h2 style={{ color: 'red' }}>
                  {t('champion.enemy')} {champion.name}
                </h2>
                <ul className='tips'>
                  {champion.enemytips.map((tip, index) => (
                    <li className='spellInfo' key={index}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          )}

          <div className='globalSeparator' />

          <h2 style={{ textAlign: 'center' }}>{t('champion.guideLink')}</h2>
          <section className='guideLinksContainer'>
            <a href={`${OPGuideUrl}/${champion.id}/build`} target='blank' rel='noreferrer' className='guideLink'>
              OP.GG
            </a>
            <a href={`${UGGuideUrl}/${champion.id}/build`} target='blank' rel='noreferrer' className='guideLink'>
              U.GG
            </a>
          </section>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </main>
  );
}

export default Champion;
