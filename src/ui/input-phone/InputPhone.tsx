"use client";

import {
  useRef,
  useEffect,
  forwardRef,
  InputHTMLAttributes,
  useState,
  ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import {
  inputPhoneContainerStyles,
  inputPhoneLabelStyles,
  inputPhoneWrapperStyles,
  inputPhoneDropdownToggleStyles,
  inputPhoneFieldStyles,
} from "./styles";
import { TextBody } from "../typography";
import AlertIcon from "./AlertIcon";
import ClearIcon from "./ClearIcon";
import DropdownIcon from "./DropdownIcon";

export type InputPhoneCountry = {
  code: string;
  dialCode: string;
  name: string;
  flag: ReactNode | JSX.Element;
};

export interface InputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showClearButton?: boolean;
  onClear?: () => void;
  onCountryChange?: (country: InputPhoneCountry) => void;
  containerClassName?: string;
  countries: InputPhoneCountry[];
  selectedCountry: InputPhoneCountry;
}

export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  (
    {
      label,
      error,
      showClearButton = true,
      onClear,
      placeholder,
      containerClassName,
      className,
      disabled = false,
      value = "",
      onChange,
      countries,
      selectedCountry,
      onCountryChange,
      ...rest
    },
    ref
  ) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isValueEmpty = String(value).length === 0;

    const toggleDropdown = () => {
      if (!disabled) setIsDropdownOpen((prev) => !prev);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className={cn(inputPhoneContainerStyles(), containerClassName)}>
        {label && (
          <TextBody
            size="sm"
            className={inputPhoneLabelStyles({ error: !!error, disabled })}
          >
            {label}
          </TextBody>
        )}

        <div
          className={inputPhoneWrapperStyles({
            error: !!error,
            disabled,
          })}
        >
          <div
            ref={dropdownRef}
            className={inputPhoneDropdownToggleStyles({ disabled })}
            onClick={toggleDropdown}
          >
            {selectedCountry.flag}
            <DropdownIcon className="text-light" />

            {isDropdownOpen && (
              <div className="absolute top-full mt-4 left-0 z-10 w-24 bg-white border rounded shadow">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(false);
                      onCountryChange?.(country);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-10 cursor-pointer transition-colors duration-300 ease-in"
                  >
                    {country.flag}
                    <span className="text-sm">{country.dialCode}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <TextBody
            size="sm"
            className={cn("text-primary", disabled && "text-light")}
          >
            {selectedCountry.dialCode}
          </TextBody>

          <input
            ref={ref}
            disabled={disabled}
            value={value}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, "");
              onChange?.({
                ...e,
                target: {
                  ...e.target,
                  value: numericValue,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            placeholder={placeholder}
            className={cn(
              inputPhoneFieldStyles({
                disabled,
                clearable: showClearButton,
              }),
              className
            )}
            {...rest}
          />

          {showClearButton && !isValueEmpty && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light"
              onClick={disabled ? undefined : onClear}
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {error && (
          <TextBody size="sm" className="flex items-center gap-1 text-error-60">
            <AlertIcon className="w-4 aspect-square" />
            <span className="flex-1">{error}</span>
          </TextBody>
        )}
      </div>
    );
  }
);

InputPhone.displayName = "InputPhone";
