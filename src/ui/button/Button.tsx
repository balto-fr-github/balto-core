import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { LoadingSpinner, LoadingSpinnerProps } from "../loading-spinner";
import { TextBody } from "../typography/TextBody";
import { TextCaption } from "../typography/TextCaption";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg transition-colors",
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
        ghostCritical:
          "text-error-default hover:text-error-70 disabled:text-disabled active:text-error-default",
        primaryCritical:
          "bg-error-60 hover:bg-error-70 text-[#F2F2F2] disabled:bg-neutral-disabled active:bg-error-80",
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
        class: "px-3 py-2",
      },
      {
        variant: "conversion",
        size: "lg",
        class: "px-4 py-3",
      },
      {
        variant: "primary",
        size: "md",
        class: "px-3 py-2",
      },
      {
        variant: "primary",
        size: "lg",
        class: "px-4 py-3",
      },
      {
        variant: "secondary",
        size: "md",
        class: "px-3 py-2",
      },
      {
        variant: "secondary",
        size: "lg",
        class: "px-4 py-3",
      },
      {
        variant: "ghost",
        size: "sm",
        class: "p-2",
      },
      {
        variant: "ghost",
        size: "md",
        class: "p-2",
      },
      {
        variant: "ghost",
        size: "lg",
        class: "p-2",
      },
      {
        variant: "link",
        size: "sm",
        class: "p-1",
      },
      {
        variant: "link",
        size: "md",
        class: "p-1",
      },
      {
        variant: "link",
        size: "lg",
        class: "p-1",
      },
      {
        variant: "ghostCritical",
        size: "md",
        class: "p-2",
      },
      {
        variant: "primaryCritical",
        size: "lg",
        class: "px-4 py-3",
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

    const renderText = () => {
      switch (finalSize) {
        case "lg":
          return (
            <TextBody
              size="md"
              weight="medium"
              useDefaultColor={false}
              as="span"
            >
              {children}
            </TextBody>
          );
        case "md":
          return (
            <TextBody
              size="sm"
              weight="medium"
              useDefaultColor={false}
              as="span"
            >
              {children}
            </TextBody>
          );
        case "sm":
          return (
            <TextCaption
              size="md"
              weight="semibold"
              isLink={true}
              useDefaultColor={false}
              as="span"
            >
              {children}
            </TextCaption>
          );
        default:
          return (
            <TextBody
              size="sm"
              weight="medium"
              useDefaultColor={false}
              as="span"
            >
              {children}
            </TextBody>
          );
      }
    };

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

        {renderText()}
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
    ghostCritical: "md",
    primaryCritical: "lg",
  } as const;

  return defaultSizes[variant];
}
