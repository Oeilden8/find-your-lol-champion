import { CSSProperties, useEffect, useRef, useState } from 'react';
import './SelectWithDropdown.css';

export interface SelectOption {
  value: string;
  label: string | JSX.Element;
}

interface SelectProps {
  style?: CSSProperties;
  width?: string | number;
  dropDownMargin: string | number;
  isSelect?: boolean;
  haveEllipsis?: boolean;
  label: string | JSX.Element;
  options: SelectOption[];
  selectedOption?: SelectOption;
  onSelect: (option: SelectOption) => void;
}

function SelectWithDropdown(props: SelectProps) {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const optionsRef = useRef<HTMLButtonElement>(null);

  // to close dropdown if user click outside the box
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      if (isDropdown && optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdown]);

  const dropdownButtonStyle = {
    width: props.width ? props.width : 'auto',
    '--hover-opacity': isDropdown ? 1 : 0.7,
  };

  return (
    <button
      ref={optionsRef}
      type='button'
      onClick={() => {
        setIsDropdown(!isDropdown);
      }}
      style={dropdownButtonStyle}
      className='dropdownButton'
    >
      {props.selectedOption ? props.selectedOption.label : props.label ? props.label : ''}
      {props.isSelect && <p className='selectArrow'>▼</p>}

      {isDropdown && (
        <div className='dropdownContainer'>
          {props.options.map((option, index) => (
            <button
              type='button'
              className='dropdownOption'
              style={{
                width: props.width ? props.width : 'auto',
              }}
              key={index}
              onClick={() => {
                props.onSelect(option);
                setIsDropdown(false);
              }}
            >
              <p className={props.haveEllipsis ? 'textCut' : 'optionLabel'}> {option.label}</p>
            </button>
          ))}
        </div>
      )}
    </button>
  );
}

export default SelectWithDropdown;
