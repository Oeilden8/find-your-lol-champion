import loading from '../assets/icons/loading-buffer.gif';

function Loading() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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
