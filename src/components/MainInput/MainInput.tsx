import { ChangeEvent } from 'react';
import './MainInput.css';
import SearchIcon from '../../assets/icons/search.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react';
import { goldColor } from '../../utils/colors';

interface MainInputProps {
  isSearch?: boolean;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function MainInput(props: MainInputProps) {
  return (
    <section className='inputContainer'>
      {props.isSearch && <SearchIcon fill={goldColor} height='20px' />}
      <input
        type={props.isSearch ? 'search' : 'text'}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />

      <button type='button' className='clearButton' onClick={props.onClear}>
        <CloseIcon fill={goldColor} height='18px' />
      </button>
    </section>
  );
}

export default MainInput;
