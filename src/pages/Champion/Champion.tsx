import { useParams } from 'react-router-dom';
import './Champion.css';

function Champion() {
  const { name } = useParams();
  return <div>Champion {name}</div>;
}

export default Champion;
