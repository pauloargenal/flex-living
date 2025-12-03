'use client';

import { Dispatch, SetStateAction, useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  element?: JSX.Element;
}

interface DropdownProps {
  id: string;
  label?: string;
  ariaLabel: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  searchable?: boolean;
  containerClassName?: string;
  noOptionsText?: string;
  inputClassName?: string;
}

export default function Dropdown(props: DropdownProps) {
  const {
    id,
    label,
    ariaLabel,
    placeholder,
    options,
    value,
    setValue,
    disabled = false,
    searchable = false,
    containerClassName = '',
    noOptionsText = '',
    inputClassName = ''
  } = props;

  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  const displayValue = useMemo(() => {
    if (searchable && optionsVisible) {
      return searchText;
    }
    return selectedOption?.label || '';
  }, [searchable, optionsVisible, searchText, selectedOption]);

  useEffect(() => {
    if (!optionsVisible) {
      setSearchText('');
    }
  }, [optionsVisible]);

  function onSelect(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const targetWithDropdownValue = target.closest('[data-dropdown-value]') as HTMLElement;

    setValue(targetWithDropdownValue?.dataset.dropdownValue || '');
    setOptionsVisible(false);
  }

  const filteredOptions = useMemo(() => {
    if (!searchText) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  return (
    <div
      className={`w-full ${containerClassName}`}
      onBlur={(event) => {
        const target = event.relatedTarget as HTMLElement;

        if (target?.dataset?.dropdownValue) {
          return;
        }

        setOptionsVisible(false);
      }}
    >
      {label && <span className="block text-xs text-black-60 mb-1">{label}</span>}

      <div className="relative">
        <input
          id={id}
          name={id}
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={displayValue}
          disabled={disabled}
          readOnly={!searchable}
          className={`w-full px-3 py-2 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-100 
            ${searchable ? '' : 'cursor-pointer'} 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${inputClassName}`}
          type="text"
          autoComplete="off"
          onChange={(event) => {
            if (searchable) {
              setOptionsVisible(true);
              setSearchText(event.target.value);
            }
          }}
          onClick={() => {
            if (disabled) {
              return;
            }
            setOptionsVisible(!optionsVisible);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setOptionsVisible(!optionsVisible);
            }
            if (event.key === 'Escape') {
              setOptionsVisible(false);
            }
          }}
        />

        <ChevronDown
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black-50 pointer-events-none transition-transform ${
            optionsVisible ? 'rotate-180' : ''
          }`}
        />

        {optionsVisible && filteredOptions.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto bg-white border border-black-10 rounded-lg shadow-lg"
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              onSelect(event as unknown as React.MouseEvent<HTMLButtonElement>)
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSelect(event as unknown as React.MouseEvent<HTMLButtonElement>);
              }
            }}
          >
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                data-dropdown-value={option.value}
                className={`w-full text-left py-2.5 px-3 text-sm hover:bg-black-5 focus:bg-black-5 focus:outline-none transition-colors ${
                  option.value === value ? 'bg-green-10 text-green-100' : 'text-black-70'
                }`}
              >
                {option.element || option.label}
              </button>
            ))}
          </div>
        )}

        {optionsVisible && filteredOptions.length === 0 && noOptionsText && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 bg-white border border-black-10 rounded-lg shadow-lg p-3 text-sm text-black-50 text-center">
            {noOptionsText}
          </div>
        )}
      </div>
    </div>
  );
}
