import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { LoadingSpinner, LoadingSpinnerProps } from "../loading-spinner";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg font-inter font-medium transition-colors",
    "focus-visible:ring-2 focus:outline-none focus:ring-bright-blue-10",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        conversion:
          "bg-bright-blue-default hover:bg-bright-blue-hover text-white disabled:bg-bright-blue-disabled active:bg-bright-blue-pressed",
        primary:
          "bg-neutral-default hover:bg-neutral-hover text-white disabled:bg-neutral-disabled active:bg-neutral-pressed",
        secondary:
          "bg-white hover:bg-neutral-hover hover:text-inverted text-primary border border-neutral-default disabled:border-neutral-disabled disabled:bg-neutral-10 active:bg-neutral-pressed active:text-inverted",
        ghost:
          "text-neutral-default hover:text-secondary disabled:text-disabled active:text-neutral-pressed",
        link: "text-neutral-default hover:text-secondary disabled:text-disabled active:text-neutral-pressed",
        critical:
          "text-error-default hover:text-error-70 disabled:text-disabled active:text-error-default",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        variant: "conversion",
        size: "md",
        class:
          "px-3 py-2 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
      },
      {
        variant: "conversion",
        size: "lg",
        class:
          "px-4 py-3 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
      },
      {
        variant: "primary",
        size: "md",
        class:
          "px-3 py-2 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
      },
      {
        variant: "primary",
        size: "lg",
        class:
          "px-4 py-3 font-medium text-sm tracking-[0.3px] text-center font-normal text-inverted",
      },
      {
        variant: "secondary",
        size: "md",
        class:
          "px-3 py-2 font-medium text-sm tracking-[0.3px] text-center font-normal text-primary",
      },
      {
        variant: "secondary",
        size: "lg",
        class:
          "px-4 py-3 font-medium text-sm tracking-[0.3px] text-center font-normal text-primary",
      },
      {
        variant: "ghost",
        size: "sm",
        class: "p-2 font-medium text-sm tracking-[0.3px]",
      },
      {
        variant: "ghost",
        size: "md",
        class: "p-2 font-medium text-sm tracking-[0.3px]",
      },
      {
        variant: "ghost",
        size: "lg",
        class: "p-2 text-[12px] leading-[18px] tracking-[0.6px]",
      },
      {
        variant: "link",
        size: "sm",
        class:
          "p-1 text-center font-normal text-[12px] leading-[18px] tracking-[0.6px] underline decoration-[#5E5E5E] decoration-[0.72px] underline-offset-[1.2px]",
      },
      {
        variant: "link",
        size: "md",
        class:
          "p-1 text-center font-normal text-[14px] leading-[22px] tracking-[0.2px] underline decoration-[#5E5E5E] decoration-[0.84px] underline-offset-[1.12px]",
      },
      {
        variant: "link",
        size: "lg",
        class:
          "p-1 text-center font-normal text-[16px] leading-[23px] underline decoration-[#5E5E5E] decoration-[0.96px] underline-offset-[1.28px]",
      },
      {
        variant: "critical",
        size: "md",
        class:
          "p-2 text-center font-medium text-[14px] leading-[20px] tracking-[0.3px]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  spinnerProps?: Omit<LoadingSpinnerProps, "className"> & {
    className?: string;
  };
  children: React.ReactNode;
}

export const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      loading = false,
      disabled,
      className,
      spinnerProps,
      children,
      ...props
    },
    ref
  ) => {
    const finalSize = size ?? getDefaultSize(variant ?? "primary");

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size: finalSize }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <LoadingSpinner
            className={cn("-ml-1 mr-2", spinnerProps?.className)}
            size="md"
            {...spinnerProps}
          />
        )}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

function getDefaultSize(
  variant: NonNullable<ButtonProps["variant"]>
): NonNullable<ButtonProps["size"]> {
  const defaultSizes = {
    conversion: "lg",
    primary: "md",
    secondary: "md",
    ghost: "md",
    link: "sm",
    critical: "md",
  } as const;

  return defaultSizes[variant];
}
