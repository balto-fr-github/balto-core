"use client";

import {
  useRef,
  useEffect,
  forwardRef,
  InputHTMLAttributes,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { cn } from "../../utils/cn";
import {
  inputDropdownContainerStyles,
  inputDropdownLabelStyles,
  inputDropdownWrapperStyles,
  inputDropdownToggleStyles,
} from "./styles";
import { TextBody } from "../typography";
import AlertIcon from "./AlertIcon";
import DropdownIcon from "./DropdownIcon";

export type InputDropdownOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export interface InputDropdownProps
  extends Omit<InputHTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  error?: string;
  containerClassName?: string;
  leftElement?: ReactNode | JSX.Element;
  options: InputDropdownOption[];
}

export const InputDropdown = forwardRef<HTMLDivElement, InputDropdownProps>(
  (
    {
      label,
      error,
      placeholder,
      leftElement,
      containerClassName,
      className,
      disabled = false,
      value,
      onChange,
      options,
      ...rest
    },
    ref
  ) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
      if (!value && options.length > 0) {
        onChange(options[0].value);
      }
    }, [value, options, onChange]);

    const selectedOption =
      options.find((o) => o.value === value) ??
      ({ label: placeholder || "", value: "" } as InputDropdownOption);

    const toggleDropdown = useCallback(() => {
      if (!disabled) setIsDropdownOpen((prev) => !prev);
    }, [disabled]);

    const closeDropdown = useCallback(() => {
      setIsDropdownOpen(false);
    }, []);

    const handleOptionClick = useCallback(
      (option: InputDropdownOption) => {
        if (option.disabled) return;
        onChange(option.value);
        closeDropdown();
      },
      [onChange, closeDropdown]
    );

    const handleClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          closeDropdown();
        }
      },
      [closeDropdown]
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return (
      <div
        ref={ref}
        className={cn(inputDropdownContainerStyles(), containerClassName)}
      >
        {label && (
          <TextBody
            size="sm"
            className={inputDropdownLabelStyles({ error: !!error, disabled })}
          >
            {label}
          </TextBody>
        )}

        <div
          role="listbox"
          className={cn(
            inputDropdownWrapperStyles({
              error: !!error,
              disabled,
              active: isDropdownOpen,
            }),
            className
          )}
          {...rest}
        >
          <div
            ref={dropdownRef}
            className={inputDropdownToggleStyles({ disabled })}
            onClick={toggleDropdown}
          >
            {leftElement && <span className="text-primary">{leftElement}</span>}

            <TextBody
              size="sm"
              className={cn(
                "text-primary truncate",
                disabled && "text-disabled"
              )}
            >
              {selectedOption.label || placeholder}
            </TextBody>

            <DropdownIcon
              className={cn(
                "text-neutral-90 ml-auto transition-transform duration-300 ease-in-out",
                isDropdownOpen && "rotate-180"
              )}
            />

            {isDropdownOpen && (
              <div className="absolute top-full mt-1 left-0 z-10 w-full bg-white border rounded gap-2 p-2 flex flex-col text-sm shadow">
                {options.map((option) => (
                  <button
                    key={option.value}
                    role="option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-2 py-2 hover:bg-info-5 cursor-pointer transition-colors duration-300 ease-in rounded",
                      value === option.value &&
                        "bg-bright-blue-10 hover:bg-bright-blue-10",
                      option.disabled &&
                        "text-disabled cursor-not-allowed hover:bg-white"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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

InputDropdown.displayName = "InputDropdown";
