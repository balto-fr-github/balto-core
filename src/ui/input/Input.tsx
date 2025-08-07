"use client";

import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { TextBody } from "../typography";
import AlertIcon from "./AlertIcon";
import ClearIcon from "./ClearIcon";

export const inputWrapperVariants = cva(
  "relative flex items-center gap-2 rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "",
      },
      disabled: {
        true: "cursor-not-allowed bg-neutral-00 text-disabled border-neutral-10",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

export const inputLabelVariants = cva(
  "text-primary transition-colors ease-in-out duration-300",
  {
    variants: {
      variant: {
        default: "text-primary",
        error: "text-error-60",
      },
      disabled: {
        true: "text-disabled",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftElement?: ReactNode | JSX.Element;
  showClearButton?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    leftElement,
    showClearButton = true,
    onClear,
    placeholder,
    containerClassName,
    className,
    disabled = false,
    value = "",
    ...rest
  } = props;

  const isValueEmpty = String(value).length === 0;

  return (
    <div className={cn("relative space-y-1", containerClassName)}>
      {label && (
        <TextBody
          size="sm"
          className={inputLabelVariants({
            variant: error ? "error" : "default",
            disabled,
          })}
        >
          {label}
        </TextBody>
      )}

      <div className={inputWrapperVariants({ disabled })}>
        {leftElement && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled">
            {leftElement}
          </span>
        )}
        {placeholder && (
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 text-disabled pointer-events-none",
              leftElement && "pl-9"
            )}
          >
            {placeholder}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          value={value}
          className={cn(
            "flex-1 bg-transparent outline-none text-sm placeholder:text-disabled px-3 py-[14px] relative rounded border w-full focus:border-primary transition-colors ease-in-out duration-300",
            error && "border-error-60 focus:border-error-60",
            showClearButton && "pr-8",
            className
          )}
          {...rest}
        />
        {showClearButton && !isValueEmpty && (
          <button
            type="button"
            className={cn(
              "z-10 absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-light",
              disabled && "cursor-not-allowed"
            )}
            onClick={disabled ? undefined : onClear}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {error && (
        <TextBody size="sm" className="flex items-center gap-1 text-error-60">
          <AlertIcon className="w-4 aspect-square" />{" "}
          <span className="flex-1">{error}</span>
        </TextBody>
      )}
    </div>
  );
});

Input.displayName = "Input";
