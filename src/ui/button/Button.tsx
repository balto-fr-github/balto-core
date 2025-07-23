import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "conversion"
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "critical";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  conversion:
    "bg-bright-blue-default hover:bg-bright-blue-hover text-white disabled:bg-bright-blue-disabled active:bg-bright-blue-pressed",
  primary:
    "bg-neutral-default hover:bg-neutral-hover text-white disabled:bg-neutral-disabled active:bg-neutral-pressed",
  secondary:
    "bg-white hover:bg-neutral-hover hover:text-inverted text-primary border border-neutral-default disabled:border-neutral-disabled disabled:bg-neutral-10 active:bg-neutral-pressed active:text-inverted",
  ghost:
    "text-neutral-default hover:text-secondary disabled:text-disabled  active:text-neutral-pressed",
  link: "text-neutral-default hover:text-secondary disabled:text-disabled  active:text-neutral-pressed",
  critical:
    "text-error-default hover:text-error-70 disabled:text-disabled active:text-error-default",
};

const buttonSizes = {
  conversion: {
    md: "px-3 py-2 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
    lg: "px-4 py-3 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
  },
  primary: {
    md: "px-3 py-2 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
    lg: "px-4 py-3 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
  },
  secondary: {
    md: "px-3 py-2 font-medium text-sm tracking-[0.3px] text-center font-normal text-primary",
    lg: "px-4 py-3 font-medium text-sm tracking-[0.3px] text-center font-normal text-primary",
  },
  ghost: {
    sm: "p-2 font-medium text-sm tracking-[0.3px]",
    md: "p-2 font-medium text-sm tracking-[0.3px]",
    lg: "p-2 text-[12px] leading-[18px] tracking-[0.6px]",
  },
  link: {
    sm: "p-1 text-center font-normal text-[12px] leading-[18px] tracking-[0.6px] underline decoration-[#5E5E5E] decoration-[0.72px] underline-offset-[1.2px]",
    md: "p-1 text-center font-normal text-[14px] leading-[22px] tracking-[0.2px] underline decoration-[#5E5E5E] decoration-[0.84px] underline-offset-[1.12px]",
    lg: "p-1 text-center font-normal text-[16px] leading-[23px] underline decoration-[#5E5E5E] decoration-[0.96px] underline-offset-[1.28px]",
  },
  critical: {
    md: "p-2 text-center font-medium text-[14px] leading-[20px] tracking-[0.3px]",
  },
};

const defaultSizes = {
  conversion: "lg",
  primary: "md",
  secondary: "md",
  ghost: "md",
  link: "sm",
  critical: "md",
} as const;

export const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size,
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const finalVariant = variant as keyof typeof buttonSizes;
    const finalSize = (size ??
      defaultSizes[
        finalVariant
      ]) as keyof (typeof buttonSizes)[typeof finalVariant];

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-inter font-medium transition-colors",
          "focus-visible:ring-2 focus:outline-none focus:ring-bright-blue-10",
          "disabled:cursor-not-allowed",
          buttonSizes[finalVariant]?.[finalSize],
          buttonVariants[finalVariant],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
