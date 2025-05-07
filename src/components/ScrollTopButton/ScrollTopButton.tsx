import './ScrollTopButton.css';

function ScrollTopButton() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <button type='button' className='scrollButton' onClick={handleScrollTop} />;
}

export default ScrollTopButton;
