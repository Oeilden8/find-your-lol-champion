import { CSSProperties, useEffect, useRef, useState } from 'react';
import './SelectWithDropdown.css';
import { useTranslation } from 'react-i18next';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  style?: CSSProperties;
  width?: string | number;
  isSelect?: boolean;
  haveEllipsis?: boolean;
  label?: string | JSX.Element;
  options: SelectOption[];
  selectedOption?: SelectOption;
  onSelect: (option: SelectOption) => void;
}

function SelectWithDropdown(props: SelectProps) {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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
    zIndex: -20,
  };

  return (
    <div style={{ width: props.width }} ref={optionsRef}>
      <button
        type='button'
        onClick={() => {
          setIsDropdown(!isDropdown);
        }}
        style={dropdownButtonStyle}
        className='dropdownButton'
      >
        <div className='labelContainer'>
          {props.selectedOption
            ? t([props.selectedOption.label, props.selectedOption.label])
            : props.label
            ? props.label
            : ''}
          {props.isSelect && <p className='selectArrow'>{'< >'}</p>}
        </div>
      </button>

      {isDropdown && (
        <div className='dropdownContainer'>
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
              <p className={props.haveEllipsis ? 'textCut' : 'optionLabel'}>{t([option.label, option.label])}</p>
              {props.selectedOption && props.selectedOption.value === option.value && <p className='checkmark'>✓</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectWithDropdown;
