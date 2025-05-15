import { useState } from 'react';
import './ChampionCard.css';

import { Champion } from '../../types/Champions';
import { formatLoadingImageUrl } from '../../utils/formatter';
import difficulty_Red from '../../assets/icons/difficultyIcons_Red.png';
import difficulty_Orange from '../../assets/icons/difficultyIcons_Orange.png';
import difficulty_Yellow from '../../assets/icons/difficultyIcons_Yellow.png';
import difficulty_Green from '../../assets/icons/difficultyIcons_Green.png';
import loading from '../../assets/icons/loading-buffer.gif';

interface ChampionCardProps {
  champion: Champion;
}

function ChampionCard(props: ChampionCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleDifficultyImg = (difficulty: number) => {
    if (difficulty > 7) {
      return difficulty_Red;
    } else if (difficulty < 4) {
      return difficulty_Green;
    } else if (difficulty === 4 || difficulty === 5) {
      return difficulty_Yellow;
    } else return difficulty_Orange;
  };

  return (
    <li className='card'>
      <img
        className='championImage'
        alt={`illustration of ${props.champion.name}`}
        src={formatLoadingImageUrl(props.champion.id, '0')}
        onLoad={() => setIsImageLoaded(true)}
      />
      {!isImageLoaded && <img src={loading} alt='icon indicating loading' width={50} />}

      <section className='championInfoContainer'>
        <div className='championInfo'>
          <p className='championName'>{props.champion.name}</p>
          <div className='championTypes'>
            {props.champion.tags.map((tag, index) => (
              <p key={index}>
                {index === 1 && ' - '}
                {tag}
              </p>
            ))}
          </div>
          {/* <p>Energie : {props.champion.partype}</p> */}
        </div>

        <div
          style={{
            background: `no-repeat url(${handleDifficultyImg(props.champion.info.difficulty)})`,
            backgroundSize: 'contain',
          }}
          className='difficulty'
          title='difficulty level icon'
        >
          <p>{props.champion.info.difficulty}</p>
        </div>
      </section>
    </li>
  );
}

export default ChampionCard;
