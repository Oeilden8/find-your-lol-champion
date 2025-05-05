import { CSSProperties, useEffect, useRef, useState } from 'react';
import './SelectWithDropdown.css';

export interface SelectOption {
  value: string;
  label: string | JSX.Element;
}

interface SelectProps {
  style?: CSSProperties;
  width?: string | number;
  dropDownMargin?: { top: string; left: string };
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
    ...props.style,
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
      <div className='labelContainer'>
        {props.selectedOption ? props.selectedOption.label : props.label ? props.label : ''}
        {props.isSelect && <p className='selectArrow'>{'< >'}</p>}
      </div>

      {isDropdown && (
        <div
          className='dropdownContainer'
          style={{
            marginTop: props.dropDownMargin ? props.dropDownMargin.top : 0,
            marginLeft: props.dropDownMargin ? props.dropDownMargin.left : 0,
          }}
        >
          {props.options.map((option, index) => (
            <button
              type='button'
              className='dropdownOption'
              key={index}
              onClick={() => {
                props.onSelect(option);
                setIsDropdown(false);
              }}
            >
              <p className={props.haveEllipsis ? 'textCut' : 'optionLabel'}> {option.label}</p>
              {props.selectedOption && props.selectedOption === option && <p className='checkmark'>✓</p>}
            </button>
          ))}
        </div>
      )}
    </button>
  );
}

export default SelectWithDropdown;
