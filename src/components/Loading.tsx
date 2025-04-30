import loading from '../assets/icons/loading-buffer.gif';

function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        margin: '-20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={loading} alt='icon indicating loading' width={50} />
    </div>
  );
}

export default Loading;
