import { useState } from 'react';
import './ImageCarousel.css';
import loading from '../../assets/icons/loading-buffer.gif';

interface ImageCarouselProps {
  images: { name: string; src: string }[];
  championName: string;
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const images = props.images;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <article className='carousel'>
        {!isImageLoaded && <img src={loading} alt='icon indicating loading' width={50} />}
        <div
          className='imageContainer'
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`${image.name}`}
              className='imageCarousel'
              onLoad={() => setIsImageLoaded(true)}
            />
          ))}
        </div>

        <div className='imageGradient' />
      </article>

      <nav className='skinsNavContainer'>
        <p>{currentIndex === 0 ? props.championName : images[currentIndex].name}</p>

        <article className='dotsContainer'>
          <div className='dotsLine' />
          <div className='dots'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={index === currentIndex ? 'dot dotActive' : 'dot dotInactive'}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
          <div className='dotsLine' />
        </article>

        <article className='thumbnailsContainer'>
          <button onClick={goToPrevious} className='navButton navButtonLeft' aria-label='Image précédente' />
          <div className='thumbnails'>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  transform: `translateX(-${currentIndex * 90}px)`,
                }}
                className={index === currentIndex ? 'thumbnail thumbnailActive' : 'thumbnail thumbnailInactive'}
              >
                <img src={image.src} alt={`Thumbnail ${index + 1} ${image.name}`} className='thumbnailImage' />
              </button>
            ))}
          </div>

          <button onClick={goToNext} className='navButton navButtonRight' aria-label='Image suivante' />
        </article>
      </nav>
    </>
  );
};

export default ImageCarousel;
