import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { TextTitle } from "../typography/TextTitle";
import { TextBody } from "../typography/TextBody";
import NeutralIcon from "./NeutralIcon";
import InfoIcon from "./InfoIcon";
import SuccessIcon from "./SuccessIcon";
import WarningIcon from "./WarningIcon";
import ErrorIcon from "./ErrorIcon";

export const alertVariants = cva("flex gap-2 p-3 rounded-lg", {
  variants: {
    type: {
      neutral: "bg-[#F2F2F2]",
      info: "bg-info-5",
      success: "bg-[#F0FDF4]",
      warning: "bg-[#FFFAF0]",
      error: "bg-error-5",
    },
    size: {
      sm: "flex-col",
      lg: "flex-row items-start",
    },
  },
  defaultVariants: {
    type: "neutral",
    size: "lg",
  },
});

export const alertIconBadgeVariants = cva(
  "flex items-center justify-center p-1 rounded-full shrink-0",
  {
    variants: {
      type: {
        neutral: "bg-neutral-10 text-primary",
        info: "bg-info-10 text-[#2563EB]",
        success: "bg-success-10 text-[#16A34A]",
        warning: "bg-warning-10 text-[#D97706]",
        error: "bg-[#FEE2E2] text-error-default",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
);

const ICONS = {
  neutral: NeutralIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
} as const;

export type AlertProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
  iconWrapperClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
} & VariantProps<typeof alertVariants> &
  React.ComponentPropsWithoutRef<"div">;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = "neutral",
      size = "lg",
      title,
      children,
      className,
      containerClassName,
      iconWrapperClassName,
      contentClassName,
      titleClassName,
      bodyClassName,
      ...props
    },
    ref
  ) => {
    const Icon = ICONS[type ?? "neutral"];

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ type, size }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex flex-row items-start gap-2",
            size === "sm" ? "w-full" : "flex-1",
            containerClassName
          )}
        >
          <div
            className={cn(
              alertIconBadgeVariants({ type }),
              iconWrapperClassName
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div
            className={cn(
              "flex flex-col flex-1 min-w-0 justify-center",
              size === "lg" && "gap-1",
              contentClassName
            )}
          >
            {size === "lg" && title && (
              <TextTitle
                as="p"
                size="sm"
                weight="bold"
                italic
                useDefaultColor
                className={titleClassName}
              >
                {title}
              </TextTitle>
            )}
            <TextBody
              size="sm"
              weight="regular"
              useDefaultColor
              className={bodyClassName}
            >
              {children}
            </TextBody>
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
