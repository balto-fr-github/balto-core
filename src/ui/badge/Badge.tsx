import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center font-semibold rounded-[99px] transition-colors font-mackinac",
  {
    variants: {
      size: {
        small: "px-2 py-1 text-[12px] leading-[12px] font-medium",
        medium: "px-2 py-1 text-[14px] leading-[14px] font-medium",
        large: "px-4 py-1 ",
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
      size: "medium",
      variant: "bg-fill",
      color: "blue",
    },
  }
);

export type BadgeProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
} & VariantProps<typeof badgeVariants> &
  React.ComponentPropsWithoutRef<"span">;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, icon, size, variant, color, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ size, variant, color }), className)}
        {...props}
      >
        {children}
        {icon && icon}
      </span>
    );
  }
);

Badge.displayName = "Badge";
