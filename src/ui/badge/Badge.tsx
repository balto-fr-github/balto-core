import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { TextLabel } from "../typography/TextLabel";
import { TextHeading } from "../typography/TextHeading";

export const badgeVariants = cva(
  "inline-flex items-center rounded-[99px] transition-colors font-mackinac py-1",
  {
    variants: {
      size: {
        sm: "px-2",
        md: "px-2",
        lg: "px-4",
      },
      variant: {
        "bg-fill": "",
        "bg-outline": "border",
      },
      color: {
        blue: "",
        orange: "",
        green: "",
        white: "",
        grey: "",
      },
    },
    compoundVariants: [
      {
        variant: "bg-fill",
        color: "blue",
        class: "bg-info-20 text-primary",
      },
      {
        variant: "bg-fill",
        color: "orange",
        class: "bg-warning-40 text-primary",
      },
      {
        variant: "bg-fill",
        color: "grey",
        class: "bg-inverted text-light",
      },
      {
        variant: "bg-fill",
        color: "green",
        class: "bg-success-40 text-primary",
      },
      {
        variant: "bg-outline",
        color: "blue",
        class: "bg-info-10 text-info-50 border-info-50",
      },
      {
        variant: "bg-outline",
        color: "orange",
        class: "bg-warning-10 text-warning-50 border-warning-50",
      },
      {
        variant: "bg-outline",
        color: "green",
        class: "bg-success-10 text-success-50 border-success-50",
      },
      {
        variant: "bg-outline",
        color: "white",
        class: "bg-white text-primary",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "bg-fill",
      color: "blue",
    },
  }
);

export type BadgeProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
  italic?: boolean;
} & VariantProps<typeof badgeVariants> &
  React.ComponentPropsWithoutRef<"span">;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      icon,
      size,
      variant,
      color,
      containerClassName,
      textClassName,
      italic = false,
      ...props
    },
    ref
  ) => {
    const renderText = () => {
      switch (size) {
        case "sm":
          return (
            <TextLabel
              weight="bold"
              size="md"
              italic={italic}
              useDefaultColor={false}
              as="span"
              className={textClassName}
            >
              {children}
            </TextLabel>
          );
        case "md":
          return (
            <TextLabel
              weight="medium"
              size="lg"
              italic={italic}
              useDefaultColor={false}
              as="span"
              className={textClassName}
            >
              {children}
            </TextLabel>
          );
        case "lg":
          return (
            <TextHeading
              size="sm"
              weight="bold"
              italic={true}
              useDefaultColor={false}
              as="span"
              className={textClassName}
            >
              {children}
            </TextHeading>
          );
        default:
          return (
            <TextLabel
              weight="medium"
              size="lg"
              italic={italic}
              useDefaultColor={false}
              as="span"
              className={textClassName}
            >
              {children}
            </TextLabel>
          );
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ size, variant, color }),
          containerClassName
        )}
        {...props}
      >
        {renderText()}
        {icon}
      </span>
    );
  }
);

Badge.displayName = "Badge";
