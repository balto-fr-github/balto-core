import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { TextLabel, TextBody, TextCaption } from "../typography";

const DefaultBadge = () => (
  <TextLabel
    weight="bold"
    size="md"
    italic
    as="span"
    className="px-2 py-1 rounded-[99px] bg-warning-40"
  >
    Default
  </TextLabel>
);

export const cardVariants = cva(
  "flex justify-between p-3 rounded-lg border transition-colors duration-200 gap-2 bg-neutral-00 border-neutral-10",
  {
    variants: {
      variant: {
        default: "items-center",
        inverted: "items-center",
        payment: "items-center",
        address: "items-start",
      },
      size: {
        desktop: "flex-row gap-4",
        mobile: "flex-col gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "desktop",
    },
  }
);

export type HorizontalCardProps = {
  icon?: React.ReactNode;
  mainText?: string;
  secondaryText?: string;
  label?: string;
  editable?: boolean;
  defaultBadge?: boolean;
  subtext?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  iconContainerClassName?: string;
  mainTextClassName?: string;
  secondaryTextClassName?: string;
  editIcon?: React.ReactNode;
  labelClassName?: string;
} & VariantProps<typeof cardVariants> &
  React.ComponentPropsWithoutRef<"div">;

export const HorizontalCard = forwardRef<HTMLDivElement, HorizontalCardProps>(
  (
    {
      icon,
      mainText,
      secondaryText,
      label,
      editable,
      defaultBadge,
      subtext,
      variant,
      size,
      onClick,
      className,
      iconContainerClassName,
      mainTextClassName,
      secondaryTextClassName,
      editIcon,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const renderMainText = () => {
      if (!mainText) return null;

      if (variant === "address") {
        return (
          <TextBody
            size="sm"
            weight="medium"
            useDefaultColor={true}
            className={cn(
              "md:text-[16px] md:leading-[23px]",
              mainTextClassName
            )}
            as="span"
          >
            {mainText}
          </TextBody>
        );
      }

      return (
        <TextBody
          size="sm"
          weight="medium"
          useDefaultColor={true}
          className={mainTextClassName}
          as="span"
        >
          {mainText}
        </TextBody>
      );
    };

    const renderSecondaryText = () => {
      if (!secondaryText) return null;

      if (variant === "address") {
        return (
          <TextBody
            size="sm"
            weight="regular"
            useDefaultColor={false}
            className={cn("text-light", secondaryTextClassName)}
            as="p"
          >
            {secondaryText}
          </TextBody>
        );
      }

      return (
        <TextCaption
          size="md"
          weight="regular"
          useDefaultColor={false}
          className={cn("text-light", secondaryTextClassName)}
          as="p"
        >
          {secondaryText}
        </TextCaption>
      );
    };

    const renderSubtext = () => {
      if (variant === "address" && subtext) {
        return (
          <TextBody
            size="sm"
            weight="regular"
            useDefaultColor={false}
            className="text-light"
            as="div"
          >
            {subtext}
          </TextBody>
        );
      }
      return subtext;
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      >
        <div className={cn("flex gap-2 flex-1")}>
          {icon && (
            <div
              className={cn(
                "rounded-[4px] bg-info-10 w-[38px] h-[38px] flex-shrink-0 flex items-center justify-center",
                iconContainerClassName
              )}
            >
              {icon}
            </div>
          )}

          <div
            className={cn(
              "flex flex-col gap-1",
              variant !== "address" && "items-center"
            )}
          >
            {variant === "default" && renderSecondaryText()}

            <div className="flex items-center gap-2">
              {renderMainText()}

              {defaultBadge && <DefaultBadge />}
            </div>

            {(variant === "inverted" || variant === "payment") &&
              renderSecondaryText()}

            {variant === "address" && (
              <>
                {renderSecondaryText()}
                {renderSubtext()}
              </>
            )}
          </div>
        </div>

        {label && (
          <div className="flex items-center gap-1 p-2 flex-shrink-0">
            {editable && editIcon}

            <TextBody weight="medium" size="sm" className={labelClassName}>
              {label}
            </TextBody>
          </div>
        )}
      </div>
    );
  }
);

HorizontalCard.displayName = "HorizontalCard";
