import { CSSProperties, useEffect, useRef, useState } from 'react';
import { goldColor, hextechBlack } from '../utils/colors';

export interface SelectOption {
  value: string;
  label: string | JSX.Element;
}

interface SelectProps {
  style?: CSSProperties;
  width?: string | number;
  dropDownMargin: string | number;
  isSelect?: boolean;
  label: string | JSX.Element;
  options: SelectOption[];
  selectedOption?: SelectOption;
  onSelect: (option: SelectOption) => void;
}

function SelectWithDropdown(props: SelectProps) {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectStyle = { ...props.style, width: props.width ? props.width : '100%' };

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

  return (
    <section style={selectStyle} ref={optionsRef}>
      <button
        type='button'
        onClick={() => {
          setIsDropdown(!isDropdown);
        }}
        style={{ width: props.width ? props.width : 'auto', backgroundColor: 'transparent' }}
      >
        {props.selectedOption ? props.selectedOption.label : props.label ? props.label : ''}
        {props.isSelect && <p className='selectArrow'>▼</p>}
      </button>

      {isDropdown && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: hextechBlack,
            borderRadius: '5px',
            border: `1px solid ${goldColor}`,
            display: 'flex',
            flexDirection: 'column',
            marginTop: props.dropDownMargin,
          }}
        >
          {props.options.map((option, index) => (
            <button
              type='button'
              style={{
                width: props.width ? props.width : 'auto',
                backgroundColor: 'transparent',
                padding: 5,
                color: 'white',
                fontFamily: 'Spiegel',
                fontSize: 14,
              }}
              key={index}
              onClick={() => {
                props.onSelect(option);
                setIsDropdown(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SelectWithDropdown;
